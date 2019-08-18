import React, { Component } from 'react';
import Layout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Breadcrumb,Form, Select, Input, Button } from 'antd';
const { Option } = Select;
import "./index.css";

class CategoryAdd extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ',values);
            }
        });
    }
    render() {
    	const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                	<Breadcrumb.Item>首页</Breadcrumb.Item>
                	<Breadcrumb.Item>分类管理</Breadcrumb.Item>
                	<Breadcrumb.Item>添加分类</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content">
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                        <Form.Item label="父级分类">
                        	{getFieldDecorator('pid', {
                        		rules: [{ required: true, message: '请选择父级分类!' }],
                        	})(
                            	<Select
                            		placeholder="请选择父级分类"
                            	>
                            		<Option value="0">根分类</Option>
                            	</Select>,
                        	)}
                        </Form.Item>                    
                        <Form.Item label="分类名称">
                        	{getFieldDecorator('name', {
                        		rules: [{ required: true, message: '请输入分类名称!' }],
                        	})(<Input />)}
                        </Form.Item>
                        <Form.Item label="手机分类名称">
                        	{getFieldDecorator('mobileName', {
                       			rules: [{ required: true, message: '请输入手机分类名称!' }],
                        	})(<Input />)}
                        </Form.Item>                        
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                        	<Button type="primary" onClick={this.handleSubmit}>
                        		提交
                        	</Button>
                        </Form.Item>
                    </Form>                                      
                </div>
            </Layout>
        )
    }
}

const WrappedCategoryAdd = Form.create({ name: 'category' })(CategoryAdd);
const mapStateToProps = (state)=>({
      
})

const mapDispatchToProps = (dispatch)=>({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCategoryAdd);