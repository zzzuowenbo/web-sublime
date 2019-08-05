const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("main/index",{
    	userInfo:req.userInfo
    });
})

router.get('/list',(req,res)=>{
    res.render("main/list",{
    	userInfo:req.userInfo
    });
})

router.get('/detail',(req,res)=>{
    res.render("main/detail",{
    	userInfo:req.userInfo
    });
})

module.exports = router;