const EventEmitter = require('events');
class CustomEmitter extends EventEmitter{

}
const emitter = new CustomEmitter();
/*emitter.on('test',(arg1,arg2)=>{
	console.log(arg1);
	console.log(arg2);
})
emitter.emit('test','hello','world');*/

const arr = [11,22,33];
emitter.on('test',(arg1,arg2,arg3)=>{
	console.log(arg1);
	console.log(arg2,arg3);
})
emitter.emit('test',...arr);