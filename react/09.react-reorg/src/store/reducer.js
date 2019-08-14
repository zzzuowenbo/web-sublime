import { combineReducers } from 'redux'
import { reducer as todolistReducer } from '../page/todolist/store'

export default combineReducers({
    todolist:todolistReducer
})
