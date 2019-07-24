/*const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('test',()=>{
	console.log("test...");
})
emitter.emit('test');*/

const EventEmitter = require('events');
class CustomEmitter extends EventEmitter{

}
const emitter = new CustomEmitter();
emitter.on('test',()=>{
	console.log("test...");
})
emitter.emit('test');