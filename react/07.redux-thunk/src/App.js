import React,{ Component } from 'react';
import { getChangeItemAction,getAddItemAction,getDelItemAction,getRequestInitDataAction } from './store/actionCreator.js';
import store from './store';
import AppUI from './AppUI.js';

class App extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        store.subscribe(()=>{this.setState(store.getState())});
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }
    componentDidMount(){
        store.dispatch(getRequestInitDataAction());
    }
    handleAdd(){
        store.dispatch(getAddItemAction());   
    }
    handleChange(ev){
      const task = ev.target.value;
      store.dispatch(getChangeItemAction(task));
    }
    handleDel(index){
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