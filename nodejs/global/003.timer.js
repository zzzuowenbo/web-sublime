const t2 = setImmediate(()=>{	//4
	console.log("setImmediate...");
})
// clearImmediate(t2);
const t1 = setTimeout(()=>{	//3
	console.log("setTimeout...");
},0)
const time = process.nextTick(()=>{	//2
	console.log("time...");
})
console.log("timer...");//1