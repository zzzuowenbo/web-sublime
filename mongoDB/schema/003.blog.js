const mongoose = require('mongoose');
const blogModel = require('./models/blog.js');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
  console.log("error...");
  throw "error...";
});
db.once('open', function(){
    blogModel.insertMany({
    	title:"blog",
    	content:"this is my blog",
    	author:"5d40f92e547fef07d8f729a6"
    })
    .then(docs=>{
    	console.log(docs);
    }) 
    .catch(err=>{
    	console.log(err);
    }) 
});
