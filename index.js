/*
 * @Author: Cuiyuan
 * @Date: 2022-01-26 16:37:07
 * @LastEditors: Cuiyuan
 * @LastEditTime: 2022-01-26 17:10:08
 * @Description: file content
 * @FilePath: /servertest/index.js
 */
//依赖一个http模块，相当于java中的import，与C#中的using
// var http = require('http');

// //创建一个服务器对象
// server = http.createServer(function (req, res) {
// //设置请求成功时响应头部的MIME为纯文本
// res.writeHeader(200, {"Content-Type": "text/plain"});
// //向客户端输出字符
// res.end("Hello World\n");
// });
// //让服务器监听本地8000端口开始运行
// server.listen(8000,'127.0.0.1');
// console.log("server is runing at 127.0.0.1:8000");

// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

"use strict";
const nodemailer = require("nodemailer");

// 使用async..await 创建执行函数
async function main() {
  // 如果你没有一个真实邮箱的话可以使用该方法创建一个测试邮箱
  let testAccount = await nodemailer.createTestAccount();

  // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 第三方邮箱的主机地址
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:  '1023968712@qq.com', //testAccount.user, // 发送方邮箱的账号
      pass: 'sqwpqaxawqzobbdc' //testAccount.pass, // 邮箱授权密码
    },
  });

  // 定义transport对象并发送邮件
  let info = await transporter.sendMail({
    from: '"1023968712@qq.com', // 发送方邮箱的账号
    to: "charlescy1031@icloud.com", // 邮箱接受者的账号
    subject: "Hello Dooring", // Subject line // 邮件主题
    text: "H5-Dooring?", // 文本内容 
    html: "欢迎注册h5.dooring.cn, 您的邮箱验证码是:<b>${emailCode}</b>", // html 内容, 如果设置了html内容, 将忽略text内容
  });
}
console.log('正在测试')
main().catch(console.error);
