import axios from 'axios';
import * as types from './actionTypes.js';
import {message} from 'antd';
import api from 'api';

const getSetPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}

const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}
export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		api.getOrdersList({
			page:page
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))
			}else{
				message.error(result.message)
			}			
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})	
	}
}

const setOrderDetail = (payload)=>({
	type:types.SET_ORDER_DETAIL,
	payload
})
export const getOrderDetailAction = (orderNo)=>{
	return (dispatch)=>{
		api.getOrdersDetail({
			orderNo:orderNo
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setOrderDetail(result.data))
			}else{
				message.error(result.message)
			}			
		})
	}
}
export const getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		api.getOrdersList({
			page:page,
			keyword:keyword
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))
			}else{
				message.error(result.message)
			}			
		})
	}
}
export const getOrderDeliverAction = (orderNo)=>{
	return (dispatch)=>{
		api.updateOrdersStatus({
			orderNo:orderNo,
			status:40
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(setOrderDetail(result.data))
			}
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
		})
	}	
}