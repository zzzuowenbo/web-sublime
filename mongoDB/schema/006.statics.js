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
    userModel.findByPhone("18840841612",(err,user)=>{
        if(err){
            console.log(err);
        }else{
            console.log(user);
        }
    })
});
