const path = require('path');
const swig = require('swig');
const querystring = require('querystring');
const { get:getItem,add:addItem,del:delItem } = require('../model/item.js');

class Controller{
	/*index就是一个action*/
	index(req,res,...args){
		getItem()
		.then(data=>{
			const filePath = path.normalize(__dirname+'/../View/item/index.html');
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

	add(req,res,...args){
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		})
		req.on('end',()=>{
			const query = querystring.parse(body);
			addItem(query.task)
			.then((data)=>{
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

	del(req,res,...args){
		const id = args[0];
		delItem(id)
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
}

module.exports = new Controller();