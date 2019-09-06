const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	const parsedUrl = url.parse(req.url,true);
	const pathName = parsedUrl.pathname;
	/*
		以/static/开头的请求都是静态资源
		不以/static/开头的请求都是具体路由
		路由的格式:
		/Controller/action/arg1/arg2...
	*/
	if(pathName.startsWith('/static/')){
		const filePath = path.normalize(__dirname+'/'+req.url);
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
	else{
		const paths = pathName.split('/');
		const controller = paths[1] || "Index";
		const action = paths[2] || "index";
		const args = paths.splice(3);
		/*所有Controller文件都保存在./Controller/目录下面*/
		try{
			const mode = require(path.normalize(__dirname+"/Controller/"+controller));
			mode[action] && mode[action](...[req,res].concat(args));
		}catch(err){
			res.setHeader('Content-type','text/html;charset=UTF-8');
			res.statusCode = 404;
			res.end('<h1>错误</h1>');
		}	
	}

	/*
	if(pathName == '/' || pathName == '/index.html'){
		get()
		.then(data=>{
			const filePath = path.normalize(__dirname+'/static/index.html');
			const template = swig.compileFile(filePath);
			const html = template({
				data:data
			});
			res.setHeader('Content-type','text/html;charset=UTF-8');
			res.end(html);
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
		.then((data)=>{
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
	*/
});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running');
})