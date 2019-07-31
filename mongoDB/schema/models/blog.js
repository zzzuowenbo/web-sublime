const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
 	title:{
 		type:String
 	},
 	content:{
 		type:String
 	},
 	author:{
 		type:mongoose.Schema.Types.ObjectId
 	}
});

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;