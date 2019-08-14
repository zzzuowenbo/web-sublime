import React,{ Component } from 'react';
import { getChangeItemAction,getAddItemAction,getDelItemAction } from './store/actionCreator.js';
import store from './store';
import AppUI from './AppUI.js';
// import 'antd/dist/antd.css';

class App extends Component{
    constructor(props){
        super(props);
        /*this.state = {
            list:["吃饭","睡觉","读书"],
            task:''
        };*/
        this.state = store.getState();
        store.subscribe(()=>{this.setState(store.getState())});
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }
    handleAdd(){
        /*this.setState((preState)=>({
            list:[...preState.list,preState.task],
            task:''
        }))*/
        /*const action = {
            type:ADD_ITEM
        };
        store.dispatch(action);*/
        store.dispatch(getAddItemAction());   
    }
    handleChange(ev){
      const task = ev.target.value;
      /*this.setState(()=>({
         task:task
      }))*/
      /*const action = {
         type:CHANGE_ITEM,
         payload:task
      };
      store.dispatch(action);*/
      store.dispatch(getChangeItemAction(task));
    }
    handleDel(index){
       /*const list = [...this.state.list];
        list.splice(index,1);
        this.setState(()=>({
            list:list
        }))*/
        /*const action = {
            type:DEL_ITEM,
            payload:index
        };
        store.dispatch(action);*/
        store.dispatch(getDelItemAction(index));
    }
    render(){
        return( 
            <AppUI
                task={this.state.task}
                list={this.state.list}
                handleChange={this.handleChange}
                handleAdd={this.handleAdd}
                handleDel={this.handleDel}
            />
        )             
    }
}

export default App;