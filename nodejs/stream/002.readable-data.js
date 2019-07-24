/*process.stdin.on('data',(chunk)=>{
	console.log(chunk);
})*/

const {Readable} = require('stream');
class CustomReader extends Readable{
	constructor(){
		super();
		this.index = 0;
	}
	_read(){
		this.index++;
		if(this.index>5){
			this.push(null);
		}
		else{
			this.push(this.index+'');
		}
		
	}
}

const reader = new CustomReader();

/*// 从可读流中读取数据
let body = '';

reader.on('data',(chunk)=>{
	// console.log(chunk);
	body+=chunk;
})

reader.on('end',()=>{
	console.log('end...');
	console.log(body);
})*/

reader.pipe(process.stdout);