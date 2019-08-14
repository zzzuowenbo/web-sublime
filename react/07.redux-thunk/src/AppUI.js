import React,{ Component } from 'react';
import {  Button,Input,Row,Col,List } from 'antd';
import "./App.css";

/*class AppUI extends Component{
    render(){
        return( 
        <div className="App">
            <Row>
                <Col span={22}>
                    <Input 
                        onChange={this.props.handleChange}
                        value={this.props.task}
                    />
                </Col>
                <Col span={2}>
                    <Button 
                        type="primary"
                        onClick={this.props.handleAdd}
                    >
                        提交
                    </Button>
                </Col>
            </Row>
            <List
                style={{marginTop:5}}
                bordered
                dataSource={this.props.list}
                renderItem={(item,index)=>(
                    <List.Item 
                        onClick={()=>{this.props.handleDel(index)}}
                    >
                        {item}
                    </List.Item>
                )}
            />          
        </div> 
        )             
    }
}*/

const AppUI = (props)=>{
    const { handleChange,task,handleAdd,list,handleDel } = props;
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

export default AppUI;