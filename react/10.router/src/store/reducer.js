// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as todolistReducer } from '../page/todolist/store'

export default combineReducers({
    todolist:todolistReducer
})
