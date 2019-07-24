const EventEmitter = require('events');
class CustomEmitter extends EventEmitter{

}
const emitter = new CustomEmitter();
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.addListener('test',()=>{
	console.log("test..addListener...");
})
emitter.once('test',()=>{
	console.log("test..once...");
})
console.log(emitter.on==emitter.addListener);
emitter.emit('test');
emitter.emit('test');

/*emitter.setMaxListeners(11);
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.on('test',()=>{
	console.log("test..on...");
})
emitter.emit('test');*/