async function pagination(options){
    let { page,model,query,sort,projection,populates } = options;
    const limit = 2;
    page = parseInt(page);    
    if(isNaN(page)){
        page = 1;
    }

    //上一页边界值控制
    if(page == 0){
        page = 1;
    }
    const count = await model.countDocuments();  
    const pages = Math.ceil(count / limit);
    
    //下一页边界值控制
    if(page > pages){
        page = pages;
    }
    if(page == 0){
        page = 1;
    }

    const list = [];
    for(let i = 1;i<=pages;i++){
        list.push(i);
    }

    const skip = (page-1)*limit;

    let result = model.find(query,projection);
    if(populates){
        populates.forEach(populate=>{
            result = result.populate(populate)
        })
    }
    const docs = await result.sort(sort).skip(skip).limit(limit);

    return{
        docs:docs,
        page:page,
        list:list,
        pages:pages        
    }
}

module.exports = pagination;