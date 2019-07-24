// 定义模块
console.log('m5...');
const str = 'hello';

const fn = ()=>{
	console.log('fn...');
}

const obj = {
	name:'rose',
	age:18
}

/*console.log(exports);
console.log(module.exports);
console.log(exports==module.exports);*/

/*exports = {
	str,
	fn,
	obj
}*/

/*module.exports = {
	str,
	fn,
	obj
}*/

exports.str = str;
exports.fn = fn;
exports.obj = obj;

/*module.exports.str = str;
module.exports.fn = fn;
module.exports.obj = obj;*/