const fs = require('fs');
const ws = fs.createWriteStream('./ws.txt');
ws.on('open',()=>{
	console.log('open...');
})
ws.on('close',()=>{
	console.log('close...');
})
ws.on('finish',()=>{
	console.log('finish...');
})
ws.write('hello\n');
ws.write('world');
ws.end();