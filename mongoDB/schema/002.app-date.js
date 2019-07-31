const mongoose = require('mongoose');
const moment = require('moment');
const userModel = require('./models/user.js');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
  console.log("error...");
  throw "error...";
});
db.once('open', function(){
    userModel.findById("5d40fa1799cbd206b4d5bc2f",(err,user)=>{
      if(err){
        console.log(err);
      }else{
      	const date = new Date(user.createAt);
      	// console.log(date.getHours());
      	// console.log(date.toLocaleString())
      	console.log(moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'));
      }
    })  
});
