import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import {  Button,Input,Row,Col,List } from 'antd';
import "./index.css";

class TodoList extends Component{
    componentDidMount(){
        this.props.handleInit();
    }
    render(){
        const { handleChange,task,handleAdd,list,handleDel } = this.props;
        return( 
            <div className="TodoList">
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
        task:state.get('todolist').get('task'),
        list:state.get('todolist').get('list')
    }    
}

const mapDispatchToProps = (dispatch)=>({
    handleChange:(ev)=>{
        const task = ev.target.value;
        dispatch(actionCreator.getChangeItemAction(task));
    },
    handleAdd:()=>{
        dispatch(actionCreator.getAddItemAction());
    },
    handleDel:(index)=>{
        dispatch(actionCreator.getDelItemAction(index));
    },
    handleInit:()=>{
        dispatch(actionCreator.getRequestInitDataAction());
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);