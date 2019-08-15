import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import "./index.css";
import { getUsername,removeUsername } from 'util';
const { Header } = Layout;

class AdminHeader extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(){
        axios({
            method: 'delete',
            url:'http://127.0.0.1:3000/sessions/users',
        })
        .then(result=>{
            if(result.data.code == 0){
                removeUsername()
                window.location.href = '/login'
            }
        })
    }
    render() {
        const menu = (
          <Menu onClick={this.handleLogout}>
            <Menu.Item key="1">
                <Icon type="logout" /> 退出
            </Menu.Item>
          </Menu>
        )   
        return (
            <div className="AdminHeader">
                <Header className="header">
                  <div className="logo">
                    KMALL
                  </div>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        {getUsername()} <Icon type="down" />
                    </a>
                  </Dropdown>
                </Header>
            </div>
        );
    }
}

export default AdminHeader;