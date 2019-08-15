import axios from 'axios'
import { message } from 'antd'

import * as types  from './actionTypes.js'

import { saveUsername } from 'util'

const getLoginRequestStartAction = ()=>({
    type:types.LOGIN_REQUEST_START,
})
const getLoginRequestDoneAction = ()=>({
    type:types.LOGIN_REQUEST_DONE,
})

export const getLoginAction = (values)=>{
    return (dispatch,getState)=>{
        dispatch(getLoginRequestStartAction())
        values.role = 'admin'
        axios({
            method: 'post',
            url:'http://127.0.0.1:3000/sessions/users',
            data:values
        })
        .then(result=>{
            const data  = result.data
            if(data.code == 0){
                saveUsername(data.data.username)
                window.location.href = "/"
            }else{
                message.error(data.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getLoginRequestDoneAction())
        })       
    }
}



