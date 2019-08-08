const express = require('express');
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js');
const router = express.Router();

//注册
router.post('/register',(req,res)=>{
    const { username,password } = req.body
    UserModel.findOne({username:username})
    .then(user=>{
        if(user){
            res.json({
                status:10,
                message:"该用户名已经存在,请换一个"
            })         
        }
        else{
            UserModel.insertMany({
                username:username,
                password:hmac(password),
                // isAdmin:true
            })
            .then(user=>{
                res.json({
                    status:0,
                    message:"注册成功",
                    data:user
                })                  
            })
            .catch(err=>{
                console.log(err)
                res.json({
                    status:10,
                    message:"服务器端错误,请稍后再试"
                }) 
            })
        }
    })
    .catch(err=>{
        console.log("insert user:",err)
        res.json({
            status:10,
            message:"服务器端错误,请稍后再试"
        })          
    })
})

//登录
router.post('/login',(req,res)=>{
    const { username,password } = req.body
    UserModel.findOne({username:username,password:hmac(password)},"-password -__v")
    .then(user=>{
        if(user){
            //生成cookie并返回给前端
            /*req.cookies.set('userInfo',JSON.stringify(user),{maxAge:2000});
              req.cookies.set('userInfo',JSON.stringify(user));*/
            //生成session并返回给前端
            req.session.userInfo = user;
            res.json({
                status:0,
                message:"登录成功",
                data:user
            })         
        }
        else{
            res.json({
                status:10,
                message:"用户名和密码错误"
            })  
        }
    })
    .catch(err=>{
        res.json({
            status:10,
            message:"服务器端错误,请稍后再试"
        })          
    })
})

//退出
router.get('/logout',(req,res)=>{
    // req.cookies.set('userInfo',null);
    req.session.destroy();
    res.json({
        status:0,
        message:"退出成功"
    }) 
})

module.exports = router;