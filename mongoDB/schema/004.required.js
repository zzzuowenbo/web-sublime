const mongoose = require('mongoose');
const userModel = require('./models/user.js');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
  console.log("error...");
  throw "error...";
});
db.once('open', function(){
    userModel.insertMany({
    	name:"rose",
    	age:18,
    	major:"computer",
    	phone:"18840841612"
    })
    .then(docs=>{
    	console.log(docs);
    }) 
    .catch(err=>{
    	console.log(err.message);
    }) 
});
