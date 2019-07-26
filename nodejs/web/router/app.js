const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const swig = require('swig');
const querystring = require('querystring');
const { get,add,del } = require('./model/item.js');
const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	const parsedUrl = url.parse(req.url,true);
	const pathName = parsedUrl.pathname;
	if(pathName == '/' || pathName == '/index.html'){
		get()
		.then(data=>{
			const filePath = path.normalize(__dirname+'/static/index.html');
			const template = swig.compileFile(filePath);
			const html = template({
				data:data
			});
			// console.log(html);
			res.setHeader('Content-type','text/html;charset=UTF-8');
			res.end(html);
			/*
			fs.readFile(filePath,(err,data)=>{
				if(err){
					res.setHeader('Content-type','text/html;charset=UTF-8');
					res.statusCode = 404;
					res.end('<h1>错误</h1>');
				}else{
					res.setHeader('Content-type','text/html;charset=UTF-8');
					res.end(data);
				}
			})
			*/
		})
		.catch(err=>{
			res.setHeader('Content-type','text/html;charset=UTF-8');
			res.statusCode = 404;
			res.end('<h1>错误</h1>');
		})		
	}
	else if(pathName == '/add'){
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		})
		req.on('end',()=>{
			const query = querystring.parse(body);
			add(query.task)
			.then(data=>{
				res.end(JSON.stringify({
					code:0,
					message:'add success',
					data:data
				}))
			})
			.catch(err=>{
				res.end(JSON.stringify({
					code:1,
					message:'add fail'
				}))
			})
		})
	}
	else if(pathName == '/del'){
		const id = parsedUrl.query.id;
		del(id)
		.then(()=>{
			res.end(JSON.stringify({
				code:0,
				message:'del success'
			}))
		})
		.catch(err=>{
			res.end(JSON.stringify({
				code:1,
				message:'del fail'
			}))
		})
	}
	else{
		const filePath = path.normalize(__dirname+'/static/'+req.url);
		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<h1>错误</h1>');
			}else{
				const extname = path.extname(filePath);
				const mimeType = mime[extname] || 'text/plain';
				res.setHeader('Content-type',mimeType+';charset=UTF-8');
				res.end(data);
			}
		})
	}
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running');
})