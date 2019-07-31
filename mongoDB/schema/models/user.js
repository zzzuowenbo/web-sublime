const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 	name:{
 		type:String,
 		required:[true,"请输入姓名"],
 		maxlength:[6,"最大长度为6"],
 		minlength:[3,"最小长度为3"]
 	},
 	age:{
 		type:Number,
 		min:[18,"最小值为18"],
 		max:[100,,"最大值为100"]
 	},
 	major:{
 		type:String,
 		enum:["computer","math","art","English","Spanish"]
 	},
 	phone:{
 		type:String,
 		validate:{
 			validator:function(val){
        		return /1[378]\d{9}/.test(val);
      		},
      		message:'{VALUE} is not a valid phone number!'
 		}
 	},
 	isLocked:{
 		type:Boolean,
 		default:false
 	},
 	friends:{
 		type:Array
 	},
 	createAt:{
 		type:Date,
 		default:Date.now
 	}
});

userSchema.methods.findBlogs = function(cb){
	this.model('blog').find({author:this._id},cb);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;