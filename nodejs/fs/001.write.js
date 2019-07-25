const fs = require('fs');
const util = require('util');

/*1.同步
// 1.1逐步操作
const fd = fs.openSync('./001.txt','w');
// const fd = fs.openSync('./001.txt','a');
fs.writeSync(fd,'aaa');
fs.closeSync(fd);

// 1.2合并操作
// fs.writeFileSync('./002.txt','hello',{flag:'a'});
fs.writeFileSync('./002.txt','hello');
*/

/*2.异步
// 2.1逐步操作
fs.open('./003.txt','w',(err,fd)=>{
	if(err){
		console.log(err);
	}else{
		fs.write(fd,'bbb',(err)=>{
			if(err){
				console.log(err);
			}else{
				console.log('ok');
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
fs.writeFile('./004.txt','world',{flag:'a'},err=>{
	if(err){
		console.log(err);
	}else{
		console.log('ok');
	}
})
*/

/*promise操作*/
const writeFile = util.promisify(fs.writeFile);
writeFile('./005.txt','promise',{flag:'w'})
.then(data=>{
	console.log('success');
})
.catch(err=>{
	console.log(err);
})