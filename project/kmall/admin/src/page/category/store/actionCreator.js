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

export const getAddAction = (values)=>{
    return (dispatch,getState)=>{
        api.addCategories(values)
        .then(result=>{           
            if(result.code == 0){
                message.success('添加分类成功')
                dispatch(setCategoriesAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })                 
    }
}

export const getLevelCategoriesAction = ()=>{
    return (dispatch,getState)=>{
        api.getlevelCategories({
            level:2
        })
        .then(result=>{           
            if(result.code == 0){
                dispatch(setCategoriesAction(result.data))
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })                 
    }
}