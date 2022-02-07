/*
 * @Author: Cuiyuan
 * @Date: 2022-02-07 10:44:45
 * @LastEditors: Cuiyuan
 * @LastEditTime: 2022-02-07 18:58:46
 * @Description: file content
 * @FilePath: /servertest/puppeteer/dsadsdas.ts
 */
import * as puppeteer from "puppeteer";
//import mongo from '../lib/mongoDB';
import chalk from "chalk";

const log = console.log;
const TOTAL_PAGE = 50;

interface IWriteData {
  link: string;
  picture: string;
  price: number;
  title: string;
}

function formateProgress(current: number): string {
  let percent = (current / TOTAL_PAGE) * 100;
  let done = ~~((current / TOTAL_PAGE) * 40);
  let left = 40 - done;
  let str = `当前进度：[ ${"".padStart(done, "=")} ${"".padStart(
    left,
    "-"
  )}] ${percent}%`;
  return str;
}

async function main() {
  // 通过puppeteer启动一个浏览器环境
  const browser = await puppeteer.launch();
  log(chalk.green("服务正常启动"));
  // 试用try catch 捕获异步中的错误进行统一错误处理
  try {
    // 打开一个新的页面
    const page = await browser.newPage();
    page.on("console", (msg) => {
      if (typeof msg === "object") {
        console.dir(msg);
      } else {
        log(chalk.blue(msg));
      }
    });
    // 打开我们刚看到的淘宝页面
    await page.goto(
      "https://s.taobao.com/search?q=gtx1080&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180416&ie=utf8"
    );
    log(chalk.yellow("页面初次加载完毕"));
    // 使用一个for await循环，不能一个时间打开多个网络请求，这样容易因为内存过大而挂掉
    for (let i = 0; i < TOTAL_PAGE; i++) {
      // 找到分页的输入框以及跳转按钮
      const pageInput = await page.$(`.J_Input[type='number']`);
      const submit = await page.$(".J_Submit");
      // 模拟输入要跳转的页数
      await pageInput.type("" + i);
      // 模拟点击
      await submit.click();
      // 等待页面加载完毕，这里设置的是固定的时间间隔，可以使用waitForNavigation,但是会因为时间过久而报错
      await page.waitForNavigation();
      // 清除当前控制台信息
      console.clear();
      log(chalk.yellow(formateProgress(i)));
      log(chalk.yellow("页面数据加载完毕"));

      //处理数据
      await handleData();
      // 每爬取完一个页面停留一会儿
      await page.waitForNavigation();
    }

    // 所有的数据爬取完毕后关闭浏览器
    await browser.close();
    log(chalk.green("服务正常结束"));

    //
    async function handleData() {
      const list = await page.evaluate(() => {
        // 先声明一个用于存储爬取数据的
        const writeDataList: IWriteData[] = [];
        // 获取到
        let itemList = document.querySelectorAll(".item.J_MouserOnverReq");
        // 遍历每一个元素，整理需要爬取的数据
        for (let item of itemList) {
          let writeData: IWriteData = {
            picture: undefined,
            link: undefined,
            title: undefined,
            price: undefined,
          };
          // 找到商品图片的地址
          let img = item.querySelector("img");
          writeData.picture = img.src;

          // 找到商品的链接
          let link: HTMLAnchorElement = item.querySelector(
            ".pic-link.J_ClickStat.J_ItemPicA"
          );
          writeData.link = link.href;

          // 找到商品的价格，默认是string类型
          let price = item.querySelector("strong");
          writeData.price = ~~price.innerText;

          // 找到商品的标题，淘宝的商品标题有高亮效果，
          let title: HTMLAnchorElement = item.querySelector(".title>a");
          writeData.title = title.innerText;

          // 将这个标签页的数据塞进结果
          writeDataList.push(writeData);
        }
        // 当前页面数据返回
        return writeDataList;
      });
      // 得到的数据写入mongodb
      const result = await mongo.insertMany();
      log(chalk.yellow("写入数据库完毕"));
    }
  } catch (error) {
    console.log(error);
    log(chalk.red("服务意外终止"));
    await browser.close();
  } finally {
    // 退出进程
    process.exit(0);
  }
}
