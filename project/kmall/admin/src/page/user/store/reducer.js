import * as types  from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    isFetching:false,
    list:[],
    current:1,
    total:0,
    pageSize:0
})

export default (state=defaultState,action)=>{
    if(action.type == types.SET_PAGE){
        return state.merge({
            list:fromJS(action.payload.list),
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize
        })
    }
    return state
}