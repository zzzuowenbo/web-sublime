import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from 'common/layout';
import "./index.css"
import { actionCreator } from './store';

class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
        <div className="Home">
            <Layout>
                <h1>首页内容</h1>
            </Layout>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)