const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
// app.use('/static', express.static('public'));

/*app.get('/get',(req,res)=>res.send('get response'));
app.post('/post',(req,res)=>res.send('post response'));
app.put('/put',(req,res)=>res.send('put response'));
app.delete('/delete',(req,res)=>res.send('delete response'));*/

/*app.get('/',(req,res)=>res.send('get response'));
app.post('/',(req,res)=>res.send('post response'));
app.put('/',(req,res)=>res.send('put response'));
app.delete('/',(req,res)=>res.send('delete response'));*/

app.all('/',(req,res,next)=>{
	console.log('all...');
	next();
})

app.get('/',(req,res,next)=>{
	console.log("get...");
	next();
},(req,res)=>{
	res.send('get response');
});
app.post('/',(req,res,next)=>{
	console.log("post...");
	next();
},(req,res)=>{
	res.send('post response');
});
app.put('/',(req,res,next)=>{
	console.log("put...");
	next();
},(req,res)=>{
	res.send('put response');
});
app.delete('/',(req,res,next)=>{
	console.log("delete...");
	next();
},(req,res)=>{
	res.send('delete response');
});

app.listen(port,()=>console.log(`app listening on port ${port}!`));