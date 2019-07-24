const EventEmitter = require('events');
class CustomEmitter extends EventEmitter{

}
const emitter = new CustomEmitter();
const listener = ()=>{
	console.log("test..on...");
}
emitter.on('test',listener);
// emitter.off('test',listener);
emitter.removeListener('test',listener);
emitter.emit('test');
console.log(emitter.removeListener==emitter.off);