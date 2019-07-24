const t2 = setImmediate(()=>{
	console.log("setImmediate...");
})
// clearImmediate(t2);
const t1 = setTimeout(()=>{
	console.log("setTimeout...");
},0)
const time = process.nextTick(()=>{
	console.log("time...");
})
console.log("timer...");