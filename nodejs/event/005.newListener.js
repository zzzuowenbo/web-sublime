const EventEmitter = require('events');
class CustomEmitter extends EventEmitter{

}
const emitter = new CustomEmitter();
/*emitter.on('newListener',()=>{
	console.log("newListener...");
})
emitter.emit('newListener');*/
emitter.on('newListener',(eventName,cb)=>{
	console.log("newListener...");
	console.log(eventName);
	cb();
})
emitter.on('test1',()=>{
	console.log("test1...");
})
emitter.on('test2',()=>{
	console.log("test2...");
})
