const mongoose = require('mongoose');
const userModel = require('./models/user.js');
const blogModel = require('./models/blog.js');
mongoose.connect('mongodb://localhost/goose', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',()=>{
  console.log("error...");
  throw "error...";
});
db.once('open', function(){
	// 查找1
	/*blogModel.findOne({title:"blog1"},(err,blog)=>{
		if(err){
			console.log(err);
		}else{
			const result = {};
			result.blog = blog;
			userModel.findOne(blog.author,(err,user)=>{
				if(err){
					console.log(err);
				}else{
					result.user = user;
					console.log(result);
				}
			})
		}
	})*/
	
	// 查找2
    /*blogModel.findOne({title:"blog1"})
    .populate('author',"name -_id")
    .then(data=>{
    	console.log(data);
    })*/

    // 查找3
    blogModel.findBlogs({title:"blog1"})
    .then(data=>{
    	console.log(data);
    })
});
