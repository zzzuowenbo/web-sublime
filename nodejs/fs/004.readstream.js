const fs = require('fs');
const rs = fs.createReadStream('./rs.txt');
rs.on('open',()=>{
	console.log('open...');
})
rs.on('close',()=>{
	console.log('close...');
})
rs.on('end',()=>{
	console.log('end...');
})
rs.on('data',(chunk)=>{
	console.log(chunk.toString());
})
