const express = require('express');
const UserModel = require('../models/user.js');
const CommentModel = require('../models/comment.js');
const pagination = require('../util/pagination.js');
const hmac = require('../util/hmac.js');

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

//评论管理
router.get('/comments',(req,res)=>{
    CommentModel.getPaginationCommentsData(req)
    .then(data=>{
        res.render("admin/comment_list",{
            userInfo:req.userInfo,
            comments:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/admin/comments"
        }) 
    })
    .catch(err=>{
        console.log(err)
    })    
})

router.get('/comment/delete/:id',(req,res)=>{
    const { id } = req.params;
    CommentModel.deleteOne({_id:id})
    .then(result=>{
        res.render("admin/success",{
        	userInfo:req.userInfo,
            message:"删除评论成功",
            url:'/admin/comments'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
        	userInfo:req.userInfo,
            message:"数据库操作失败",
            url:'/admin/comments'
        })
    })    
})

//修改密码
router.get('/password',(req,res)=>{
    res.render("admin/password",{
        userInfo:req.userInfo
    })
})

router.post('/password',(req,res)=>{
    const { password } = req.body;
    UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
    .then(result=>{
        req.session.destroy()
        res.render("admin/success",{
            userInfo:req.userInfo,
            message:"修改密码成功,请重新登录",
            url:'/'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            userInfo:req.userInfo,
            message:"修改密码失败",
            url:'/admin/password'
        })
    })
})

module.exports = router;