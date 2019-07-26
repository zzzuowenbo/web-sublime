const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	const filePath = path.normalize(__dirname+'/static/'+req.url);
	fs.readFile(filePath,(err,data)=>{
		if(err){
			res.setHeader('Content-type','text/html;charset=UTF-8');
			res.statusCode = 404;
			// res.end('err...');
			res.end('<h1>错误</h1>');
		}else{
			const extname = path.extname(filePath);
			const mimeType = mime[extname] || 'text/plain';
			res.setHeader('Content-type',mimeType+';charset=UTF-8');
			res.end(data);
		}
	})
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running');
})