const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
// app.use('/static', express.static('public'));

app.get('/users/:userId/books/:bookId',(req,res)=>{
	console.log(req.params);
	res.send('get response');
});

app.get('/',(req,res)=>{
	console.log(req.query);
	res.send('get response');
});

app.listen(port,()=>console.log(`app listening on port ${port}!`));