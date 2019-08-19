import api from 'api';
import { message } from 'antd';
import * as types  from './actionTypes.js';
import { saveUsername } from 'util';

const getPageRequestStartAction = ()=>({
    type:types.PAGE_REQUEST_START
})
const getPageRequestDoneAction = ()=>({
    type:types.PAGE_REQUEST_DONE
})
const getSetPageAction = (payload)=>({
    type:types.SET_PAGE,
    payload
})
const setCategoriesAction = (payload)=>({
    type:types.SET_CATEGORIES,
    payload
})
const setMainImageErrorAction = ()=>({
    type:types.SET_MAIN_IMAGE_ERROR
})
const setImagesErrorAction = ()=>({
    type:types.SET_IMAGES_ERROR
})

export const setMainImageAction = (payload)=>({
    type:types.SET_MAIN_IMAGE,
    payload
})
export const setImagesAction = (payload)=>({
    type:types.SET_IMAGES,
    payload
})
export const setDetailAction = (payload)=>({
    type:types.SET_DETAIL,
    payload
})

export const getSaveAction = (err,values)=>{
    return (dispatch,getState)=>{
        const state = getState().get('product');
        const mainImage = state.get('mainImage');
        const images = state.get('images');
        const detail = state.get('detail');
        let hasErr = false;
        if(err){
            hasErr = true
        }
        if(!mainImage){
            hasErr = true;
            dispatch(setMainImageErrorAction())
        }
        if(!images){
            hasErr = true;
            dispatch(setImagesErrorAction())
        }
        if(hasErr){
            return
        }
        api.addProducts({
            ...values,
            mainImage,
            images,
            detail
        })
        .then(result=>{
            if(result.code == 0){
                message.success('添加商品成功!',()=>{
                    window.location.href = "/product"
                })
            }else{
                message.error(result.message)
            }
            
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })             
    }
}
export const getLevelCategoriesAction = ()=>{
    return (dispatch,getState)=>{
        api.getlevelCategories({
            level:3
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(setCategoriesAction(result.data))
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })              
    }
}
export const getPageAction = (page)=>{
    return (dispatch,getState)=>{
        dispatch(getPageRequestStartAction())
        api.getCategoriesList({
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取分类数据失败,请稍后再试!')
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })
        .finally(()=>{
            dispatch(getPageRequestDoneAction())
        })                 
    }
}
export const getUpdateNameAction = (id,newName)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoriesName({
            id:id,
            name:newName,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新分类名称成功!')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })               
    }
}
export const getUpdateMobileNameAction = (id,newMobileName)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoriesMobileName({
            id:id,
            mobileName:newMobileName,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新手机分类名称成功!')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })               
    }
}
export const getUpdateOrderAction = (id,newOrder)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoriesOrder({
            id:id,
            order:newOrder,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新排序成功!')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })               
    }
}
export const getUpdateIsShowAction = (id,newIsShow)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current')
        api.updateCategoriesIsShow({
            id:id,
            isShow:newIsShow,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新显示隐藏成功!')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试!')
        })               
    }
}
