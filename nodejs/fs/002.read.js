const fs = require('fs');
const util = require('util');

/*1.同步
// 1.1逐步操作
const fd = fs.openSync('./001.txt','r');
const buf = Buffer.alloc(100);
console.log(buf);
fs.readSync(fd,buf,0,50,0);
console.log(buf);
fs.closeSync(fd);

// 1.2合并操作
const data1 = fs.readFileSync('./002.txt',{flag:'r'});
console.log(data1.toString());
const data2 = fs.readFileSync('./003.txt',{encoding:'utf8'});
console.log(data2);
*/

/*2.异步
// 2.1逐步操作
fs.open('./003.txt','r',(err,fd)=>{
	if(err){
		console.log(err);
	}else{
		const buf = Buffer.alloc(20);
		fs.read(fd,buf,1,10,0,(err)=>{
			if(err){
				console.log(err);
			}else{
				console.log(buf);
			}
			fs.close(fd,err=>{
				if(err){
					console.log(err);
				}else{
					console.log('ok');
				}
			})
		})
	}
})
// 2.2合并操作
fs.readFile('./004.txt',{flag:'r',encoding:'utf8'},(err,data)=>{
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
})
*/

/*promise操作*/
const readFile = util.promisify(fs.readFile);
readFile('./005.txt',{flag:'r',encoding:'utf8'})
.then(data=>{
	console.log(data);
})
.catch(err=>{
	console.log(err);
})