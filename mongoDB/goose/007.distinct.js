const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
	console.log("error...");
	throw "error...";
});
db.once('open', function(){
  	const userSchema = new mongoose.Schema({
 		name: String,
 		age:Number
	});
  	const userModel = mongoose.model('user', userSchema);
  	
  	/*userModel.distinct("major",(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  	})*/	

    userModel.distinct("name",{age:{$gt:100}},(err,docs)=>{
      if(err){
        console.log(err);
      }else{
        console.log(docs);
      }
    })  
});