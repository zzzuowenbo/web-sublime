import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { getChangeItemAction,getAddItemAction,getDelItemAction,getRequestInitDataAction } from './store/actionCreator.js';
import {  Button,Input,Row,Col,List } from 'antd';
import "./App.css";

class App extends Component{
    componentDidMount(){
        this.props.handleInit();
    }
    render(){
        const { handleChange,task,handleAdd,list,handleDel } = this.props;
        return( 
            <div className="App">
                <Row>
                    <Col span={22}>
                        <Input 
                            onChange={handleChange}
                            value={task}
                        />
                    </Col>
                    <Col span={2}>
                        <Button 
                            type="primary"
                            onClick={handleAdd}
                        >
                            提交
                        </Button>
                    </Col>
                </Row>
                <List
                    style={{marginTop:5}}
                    bordered
                    dataSource={list}
                    renderItem={(item,index)=>(
                        <List.Item 
                            onClick={()=>{handleDel(index)}}
                        >
                            {item}
                        </List.Item>
                    )}
                />          
            </div> 
        )        
    }
}

const mapStateToProps = (state)=>{
    return{
        task:state.task,
        list:state.list
    }    
}

const mapDispatchToProps = (dispatch)=>({
    handleChange:(ev)=>{
        const task = ev.target.value;
        dispatch(getChangeItemAction(task));
    },
    handleAdd:()=>{
        dispatch(getAddItemAction());
    },
    handleDel:(index)=>{
        dispatch(getDelItemAction(index));
    },
    handleInit:()=>{
        dispatch(getRequestInitDataAction());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);