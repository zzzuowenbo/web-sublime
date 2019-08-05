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
	res.render('index',{});
});

app.listen(port,()=>console.log(`app listening on port ${port}!`));