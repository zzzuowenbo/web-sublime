import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    isFetching:false
})
export default (state=defaultState,action)=>{
	if(action.type == types.LOGIN_REQUEST_START){
		return state.set('isFetching',true);
	}
	if(action.type == types.LOGIN_REQUEST_DONE){
		return state.set('isFetching',false);
	}
	return state
}