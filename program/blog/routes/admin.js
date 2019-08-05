const express = require('express');
const UserModel = require('../models/user.js');
const pagination = require('../util/pagination.js');

const router = express.Router();

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>');
	}
})

router.get('/',(req,res)=>{
    res.render("admin/index",{
        userInfo:req.userInfo
    })
})

//显示用户列表
router.get('/users',(req,res)=>{
	/*
	//每页显示多少条数据 limit
	let page = req.query.page;
	const limit = 2;
	page = parseInt(page);
	if(isNaN(page)){
		page = 1;
	}

	//上一页边界值控制
	if(page == 0){
		page = 1;
	}

	UserModel.countDocuments((err,count)=>{
		const pages = Math.ceil(count / limit);
		//下一页边界值控制
		if(page > pages){
			page = pages;
		}
		const list = [];
		for(let i=1;i<=pages;i++){
			list.push(i);
		}
		const skip = (page-1)*limit;

		UserModel.find({},"-password -__v")
		.sort({_id:-1})
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render("admin/user_list",{
        		userInfo:req.userInfo,
        		users:users,
        		page:page,
        		list:list,
        		pages:pages
    		})
		})
    	.catch(err=>{
    		console.log(err);
    	})
	})
	*/
	let page = req.query.page;
    const options = {
        page:req.query.page,
        model:UserModel,
        query:{},
        sort:{_id:-1},
        projection:"-password -__v"
    }
    pagination(options)
    .then(data=>{
        res.render("admin/user_list",{
            userInfo:req.userInfo,
            users:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/admin/users"
        })       
    })
    .catch(err=>{
       console.log(err) 
    })        
})

module.exports = router;