import React,{ Component } from 'react';
import {  DatePicker,Button } from 'antd';
import Item from './Item.js';
import "./App.css";
// import 'antd/dist/antd.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:["吃饭","睡觉","读书"],
            task:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd(){
        this.setState((preState)=>({
            list:[...preState.list,preState.task],
            task:''
        }))       
    }
    handleChange(ev){
      // const task = ev.target.value;
      const task = this.input.value;
      this.setState(()=>({
         task:task
      }))
    }
    handleDel(index){
        const list = [...this.state.list];
        list.splice(index,1);
        this.setState(()=>({
            list:list
        }))
    }
    getItems(){
    	return this.state.list.map((item,index)=>{
            return <Item key={index} task={item} handleDel={this.handleDel.bind(this,index)} />
        }) 
    }
    render(){
        return( 
        <div className="App">
            <input 
            	onChange={this.handleChange} 
            	value={this.state.task} 
            	ref={(input)=>{this.input = input}}
            />
            <button onClick={this.handleAdd}>提交</button>
            <ul>
                {
                    this.getItems()   
                }
            </ul>
            <DatePicker/>
            <Button type="primary">Primary</Button>
        </div> 
        )             
    }
}

export default App;