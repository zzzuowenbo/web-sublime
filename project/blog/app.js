const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });
mongoose.set('useFindAndModify',false);
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
    throw err;
})

db.once('open',()=>{
    console.log('ok');
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

swig.setDefaults({
  // cache: 'memory'
  cache:false
})

app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');

//设置cookie中间件
/*app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
	let userInfo = {};
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));
	}
	req.userInfo = userInfo;
	next();
})*/

//设置session中间件
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},  
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use((req,res,next)=>{
	req.userInfo = req.session.userInfo || {};
	next();
})

app.use("/",require('./routes/index.js'));
app.use("/user",require('./routes/user.js'));
app.use("/admin",require('./routes/admin.js'));
app.use("/home",require('./routes/home.js'));
app.use("/category",require('./routes/category.js'));
app.use("/article",require('./routes/article.js'));
app.use("/comment",require('./routes/comment.js'));

app.listen(port,()=>console.log(`app listening on port ${port}!`));
