// process.stdout.write('aaa');

const {Writable} = require('stream');
/*const writer = new Writable()
writer.write('aa');*/

class CustomWrite extends Writable{
	_write(chunk,encoding,callback){
		// console.log(chunk);
		console.log(chunk.toString());
		console.log(encoding);
		callback && callback();
	}
}

const writer = new CustomWrite();

writer.on('finish',()=>{
	console.log('finish...');
})

writer.write('aa','',()=>{
	console.log("callback...");
});

writer.write('bb');
// writer.end();
writer.end('end');
