const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use((req,res,next)=>{
	console.log('test a...');
	// res.send("test A...");
	next();
})
app.use((req,res,next)=>{
	console.log('test b...');
	next();
})

app.get('/',(req,res)=>res.send('get response'));

app.listen(port,()=>console.log(`app listening on port ${port}!`));