const express = require('express');
const swig = require('swig');
const app = express();
const port = 3000;

app.use(express.static('public'));

swig.setDefaults({
	// cache:'memory'
	cache:false
})
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');

app.get('/',(req,res)=>{
	res.render('index');
});

app.get('/list',(req,res)=>{
	res.render('list');
});

app.get('/base',(req,res)=>{
	res.render('base',{
		title:'跨猪网',
		// name:"rose",
        name:'mike',
        obj:{
        	name:"jack"
        },
        arr:["computer","art","math"]
	});
});

app.listen(port,()=>console.log(`app listening on port ${port}!`));