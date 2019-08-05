const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
// app.use('/static', express.static('public'));

app.get('/',(req,res)=>{
	/*res.send({name:"rose"});
	res.send('<h1>get response</h1>');
	res.send('get response');*/
	
	/*res.end({name:"Tom"});
	res.end('<h1>get response</h1>');
	res.end('get response');*/
	
	res.json({name:"rose",age:18});
});

app.listen(port,()=>console.log(`app listening on port ${port}!`));