const mongoose = require('mongoose');
const userModel = require('./models/user.js');
const blogModel = require('./models/blog.js');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
  console.log("error...");
  throw "error...";
});
db.once('open', function(){
    /*userModel.insertMany({
    	name:"jack",
    	age:20,
    	major:"art",
    	phone:"13640841612"
    })
    .then(docs=>{
    	console.log(docs);
    }) 
    .catch(err=>{
    	console.log(err.message);
    })*/

    /*blogModel.insertMany({
        title:"blog2",
        content:"this is my blog",
        author:"5d410d7bb8423621a025bdbb"
    })
    .then(docs=>{
        console.log(docs);
    }) 
    .catch(err=>{
        console.log(err);
    })*/

    // 查找1
    /*userModel.findOne({name:"jack"},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            blogModel.find({author:user._id},(err,blogs)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(blogs);
                }
            })
        }
    })*/

    userModel.findOne({name:"jack"},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            user.findBlogs((err,blogs)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(blogs);
                }
            })
        }
    })
});
