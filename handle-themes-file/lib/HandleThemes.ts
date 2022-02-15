/*
 * @Author: Cuiyuan
 * @Date: 2022-02-09 18:57:46
 * @LastEditors: Cuiyuan
 * @LastEditTime: 2022-02-09 19:09:07
 * @Description: file content
 * @FilePath: /serverTests/handle-themes-file/lib/HandleThemes.ts
 */
import { readdir } from "fs";
export default class HandleThemes {
    public getFolderFiles(path: string): void {
        readdir(path, (errStatus: any, fileList: any) => {
            if (errStatus !== null) {
                console.log("文件读取失败，错误原因:", errStatus);
                return;
            }
            console.log("文件读取成功", fileList);
        });
    }
}
