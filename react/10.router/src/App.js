import React,{ Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import TodoList from './page/todolist';
import "./App.css";

class Home extends Component{
	render(){
		return <h2>Home</h2>
	}
}

class App extends Component{
    render(){
        return(
        	<Router> 
            	<div className="App">
					<nav>
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/todolist">TodoList</Link></li>
							<li><Link to="/about">About</Link></li>
						</ul>
					</nav>
					<Route path="/" exact component={Home}/>
					<Route path="/todolist" component={TodoList}/>
					<Route path="/about" render={()=><h2>About</h2>} />
            	</div> 
        	</Router>
        )        
    }
}

export default App;