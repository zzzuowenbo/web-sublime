import React,{ Component } from 'react';
import Item from './Item.js';
import "./App.css";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:["吃饭","睡觉","读书"],
            task:''
        }
    }
    handleAdd(){
        this.setState({
            list:[...this.state.list,this.state.task],
            task:''
        })       
    }
    handleChange(ev){
      const task = ev.target.value;
      /*this.setState({
            task:ev.target.value
      })*/
      this.setState(()=>({
         task:task
      }))
    }
    handleDel(index){
        // console.log(index)
        const list = [...this.state.list];
        list.splice(index,1);
        this.setState({
            list:list
        })
    }
    render(){
        return( 
        <div className="App">
            <input onChange={this.handleChange.bind(this)} value={this.state.task} />
            <button onClick={this.handleAdd.bind(this)}>提交</button>
            <ul>
                {
                    this.state.list.map((item,index)=>{
                        /*
                        return(
                            <li 
                                key={index}
                                onClick={this.handleDel.bind(this,index)}
                            >
                                {item}
                            </li>
                        )
                        */
                       return <Item key={index} task={item} onClick={this.handleDel.bind(this,index)} />
                    })       
                }
            </ul>
        </div> 
        )             
    }
}

export default App;