const express = require('express');
const CategoryModel = require('../models/category.js');
const router = express.Router();

async function getCommonData(){
    const categoriesPromise = CategoryModel.find({},"name").sort({order:-1})
    const categories = await categoriesPromise;
    return{
        categories
    }
}

//首页
router.get('/',(req,res)=>{
    getCommonData()
    .then(data=>{
        const { categories } = data;
        res.render("main/index",{
            userInfo:req.userInfo,
            categories
        })
    })
})

//列表页
router.get('/list',(req,res)=>{
    res.render("main/list",{
    	userInfo:req.userInfo
    });
})

//详情页
router.get('/detail',(req,res)=>{
    res.render("main/detail",{
    	userInfo:req.userInfo
    });
})

module.exports = router;