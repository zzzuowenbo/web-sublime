const mongoose = require('mongoose');
const userModel = require('./models/user.js');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
	console.log("error...");
	throw "error...";
});
db.once('open', function(){
    userModel.distinct("name",{age:{$gt:100}},(err,docs)=>{
      if(err){
        console.log(err);
      }else{
        console.log(docs);
      }
    })  
});