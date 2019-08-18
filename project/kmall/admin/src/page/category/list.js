import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Table } from 'antd';
import moment from 'moment';
import { Link } from "react-router-dom";
import Layout from 'common/layout';
import "./index.css";
import { actionCreator } from './store';

const columns = [{
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '是否管理员',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render:(isAdmin)=>(isAdmin ? '是' : '否')
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '注册时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

class CategoryList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const dataSource = [];
        return (
            <div className="User">
             <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                  <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                </Breadcrumb>
                <Link to="/category/add" >添加分类</Link>
                <div className="content">
                    <Table 
                        dataSource={dataSource} 
                        columns={columns}
                    />                                    
                </div>
             </Layout>
        </div>
        );
    }
}

const mapStateToProps = (state)=>({

})

const mapDispatchToProps =(dispatch)=>({

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);