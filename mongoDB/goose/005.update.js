const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
	console.log("error...");
	throw "error...";
});
db.once('open', function() {
  	const userSchema = new mongoose.Schema({
 		name: String,
 		age:Number
	});
  	const userModel = mongoose.model('user', userSchema);

    /*userModel.updateOne({name:"Tom"},{$set:{age:10}},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }       
    })*/

    /*userModel.updateOne({age:{$gt:140}},{$set:{name:"Leo"}},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }       
    })*/

    /*userModel.updateMany({age:{$gt:140}},{name:"Peter"},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }       
    })*/

    userModel.updateOne({age:{$gt:140}},{name:"lucy"},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }       
    })
});