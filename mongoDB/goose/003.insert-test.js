const mongoose = require('mongoose');
const names = ["rose","tom","mike","jack","jenny"];
const majors = ["art","computer","sport","music"];
const getRandom = (min,max)=>{  
    return Math.round(min + (max-min)*Math.random());
}
const getName = ()=> names[getRandom(0,names.length-1)];
const getMajor = ()=> majors[getRandom(0,majors.length-1)];

mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
	console.log("error...");
	throw "error...";
});
db.once('open', function(){
  	const userSchema = new mongoose.Schema({
 		name: String,
 		age:Number,
        major:String
	});
  	const userModel = mongoose.model('user', userSchema);

  	const arr = [];
    for(let i = 0;i<10;i++){
        arr.push({
            name:getName(),
            age:getRandom(10,150),
            major:getMajor()
        })
    }

    userModel.insertMany(arr,(err,docs)=>{
        if(err){
            console.log('updateMany err::',err);
        }else{
            console.log(docs)
        }
    });
});