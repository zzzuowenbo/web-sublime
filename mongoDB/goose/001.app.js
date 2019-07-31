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
  	const user = new userModel({name:'rose',age:18});

  	/*新增*/
  	/*user.save((err,doc)=>{
    	if(err){
			console.log(err);
    	}else{
    		console.log(doc);
    	} 
  	});*/

  	/*查询*/
  	userModel.find({age:{$lt:20}},(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  	})

  	/*更新*/
  	/*userModel.updateOne({name:"rose"},{$set:{age:32}},(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  	})*/

  	/*删除*/
  	/*userModel.deleteOne({name:"rose"},(err,docs)=>{
  		if(err){
  			console.log(err);
  		}else{
  			console.log(docs);
  		}
  	})*/	
});