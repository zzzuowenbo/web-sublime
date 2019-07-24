// 指定项目名称，创建前端项目的目录结构
const fs = require('fs');
function mkp(){
	const pathName = "./"+process.argv[2];
	fs.mkdirSync(pathName);
	fs.mkdirSync(pathName+"/css");
	fs.mkdirSync(pathName+"/js");
	fs.mkdirSync(pathName+"/image");
}
module.exports = mkp;
/*const pathName = "./"+process.argv[2];
fs.mkdirSync(pathName);
fs.mkdirSync(pathName+"/css");
fs.mkdirSync(pathName+"/js");
fs.mkdirSync(pathName+"/image");*/