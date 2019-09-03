import {ADD_TODO,DEL_TODO,SELECT_ALL_TODO,DEL_ALL_DONE} from './types.js';
export default{
    [ADD_TODO]({commit},todo){
        commit(ADD_TODO,todo)
    },
    [DEL_TODO]({commit},index){
        commit(DEL_TODO,index)
    },
    [SELECT_ALL_TODO]({commit},value){
        commit(SELECT_ALL_TODO,value)
    },
    [DEL_ALL_DONE]({commit}){
        commit(DEL_ALL_DONE)
    }             
}