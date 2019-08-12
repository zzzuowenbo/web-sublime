import React,{ Component } from 'react';
import {  Button,Input,Row,Col,List } from 'antd';
import store from './store'
import "./App.css";
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
    }
    handleAdd(){
        /*this.setState((preState)=>({
            list:[...preState.list,preState.task],
            task:''
        }))*/
        const action = {
            type:"add_item"
        };
        store.dispatch(action);    
    }
    handleChange(ev){
      const task = ev.target.value;
      /*this.setState(()=>({
         task:task
      }))*/
      const action = {
         type:"change_item",
         payload:task
      };
      store.dispatch(action);
    }
    handleDel(index){
       /*const list = [...this.state.list];
        list.splice(index,1);
        this.setState(()=>({
            list:list
        }))*/
        const action = {
            type:"del_item",
            payload:index
        };
        store.dispatch(action);
    }
    render(){
        return( 
        <div className="App">
            <Row>
                <Col span={22}>
                    <Input 
                        onChange={this.handleChange}
                        value={this.state.task}
                    />
                </Col>
                <Col span={2}>
                    <Button 
                        type="primary"
                        onClick={this.handleAdd}
                    >
                        提交
                    </Button>
                </Col>
            </Row>
            <List
                style={{marginTop:5}}
                bordered
                dataSource={this.state.list}
                renderItem={(item,index)=>(
                    <List.Item 
                        onClick={this.handleDel.bind(this,index)}
                    >
                        {item}
                    </List.Item>
                )}
            />          
        </div> 
        )             
    }
}

export default App;