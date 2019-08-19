import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import ProductSave from './save.js';
import ProductList from './list.js';
import "./index.css";

class Product extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
           <Switch>
                <Route path="/product/save" component={ProductSave} />
                <Route path="/product/" component={ProductList} />
           </Switch> 
        )
    }
}

export default Product;