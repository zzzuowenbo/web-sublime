import api from 'api';
import { message } from 'antd';
import { saveUsername } from 'util';
import * as types from './actionTypes.js';
const getLoginRequestStartAction = ()=>({
	type:types.LOGIN_REQUEST_START
})
const getLoginRequestDoneAction = ()=>({
	type:types.LOGIN_REQUEST_DONE
})

export const getLoginAction = (values)=>{
	return (dispatch,getState)=>{
		dispatch(getLoginRequestStartAction());
		values.role = 'admin';
		api.login(values)
		.then(result=>{
			if(result.code == 0){
				saveUsername(result.data.username);
				window.location.href = '/';
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error('网络错误，请稍后再试!')
		})
		.finally(()=>{
			dispatch(getLoginRequestDoneAction())
		})
		/*axios({
			method:'post',
			url:'http://127.0.0.1:3000/sessions/users',
			data:values,
			withCredentials:true
		})
		.then(result=>{
			const data = result.data;
			if(data.code == 0){
				saveUsername(data.data.username);
				window.location.href = '/';
			}else{
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('网络错误，请稍后再试!')
		})
		.finally(()=>{
			dispatch(getLoginRequestDoneAction())
		})*/
	}
}