import React,{ Component } from 'react';
import Item from './Item.js';
import "./App.css";

class App extends Component{
    constructor(props){
    	console.log('constructor...');
        super(props);
        this.state = {
            list:["吃饭","睡觉","读书"],
            task:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    static getDerivedStateFromProps(props, state){
    	console.log("getDerivedStateFromProps...",props, state);
    	/*return {
    		task:"hi"
    	}*/
    	return null;
    }
    shouldComponentUpdate(nextProps, nextState){
    	console.log("shouldComponentUpdate...",nextProps, nextState);
    	return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
    	console.log("getSnapshotBeforeUpdate...",prevProps, prevState);
    	return 111;
    }
    componentDidUpdate(prevProps, prevState,snapshot){
    	console.log("componentDidUpdate...",prevProps, prevState,snapshot);
    }
    componentDidMount(){
    	console.log("componentDidMount...");
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
    	console.log("render...");
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
        </div> 
        )             
    }
}

export default App;