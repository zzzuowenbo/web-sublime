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

    /*userModel.find({age:{$gt:100}},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    /*userModel.find({age:{$gt:100}},"name age -_id",(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    /*userModel.find({age:{$gt:100}},"name age -_id",{limit:1},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    /*userModel.find({age:{$gt:100}},"name age -_id",{skip:1},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    /*userModel.find({age:{$gt:100}},"name age -_id",{sort:{age:1}},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    /*userModel.findById("5d3ebfcaf42bb62430592d26",(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    userModel.findOne({age:{$gt:100}},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })
});