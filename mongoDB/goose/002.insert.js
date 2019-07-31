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
    /*mongoose.model第一个参数是指定集合的名称,mongoose会自动变为复数*/
  	const userModel = mongoose.model('user', userSchema);
  	const user = new userModel({name:'rose',age:18});

  	/*新增*/
    /*user.save()
    .then(doc=>{
      console.log(doc);
    })
    .catch(err=>{
      console.log(err);
    })*/

    /*userModel.insertMany({name:"tom",age:18},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })*/

    /*userModel.insertMany([
        {name:"tom",age:3},
        {name:"jenny",age:4}],(err,docs)=>{
            if(err){
                console.log(err);
            }else{
                console.log(docs);
            }
    })*/    

    /*userModel.insertMany({name:"jack",age:28})
    .then(docs=>{
        console.log(docs);
    })
    .catch(err=>{
        console.log(err);
    })*/

    userModel.create({name:"tony",age:88})
    .then(docs=>{
        console.log(docs);
    })
    .catch(err=>{
        console.log(err);
    })
});