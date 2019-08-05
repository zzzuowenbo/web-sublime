const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
 	title:{
 		type:String
 	},
 	content:{
 		type:String
 	},
 	author:{
 		type:mongoose.Schema.Types.ObjectId,
 		ref:"user"
 	}
});

blogSchema.statics.findBlogs = function(query){
	// return this.findOne(query)
	return this.find(query)
	.populate('author',"name -_id");
}

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;