import React,{ Component } from 'react';
import { 
			// HashRouter as Router,
			BrowserRouter as Router, 
			Route, 
			Link,
			Switch
		} from "react-router-dom";
import TodoList from './page/todolist';
import "./App.css";

class Home extends Component{
	render(){
		return <h2>Home</h2>
	}
}
class User extends Component{
	render(){
		return <h2>User user-id is {this.props.match.params.id}</h2>
	}
}
class Admin extends Component{
	render(){
		return(
			<Switch>
				<Route exact path="/admin" render={()=><h2>Admin</h2>} />
				<Route path="/admin/profile" render={()=><h2>Admin Profile</h2>} />
				<Route path="/admin/:id" render={(route)=>(<h2>Admin admin-id is {route.match.params.id}</h2>)} />
			</Switch>
		)
	}
}

class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLogin:false
		}
	}
    render(){
    	const ProtectRoute = ({component:Component,...rest})=>{
    		return <Route
    			{...rest}
    			render={(props)=>{
    				return this.state.isLogin ? <Component {...props}/> : <h2>login</h2>
    			}}
    		/>
    	}
        return(
        	<Router> 
            	<div className="App">
					<nav>
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/todolist">TodoList</Link></li>
							<li><Link to="/about">About</Link></li>
							<li><Link to="/user/408">User408</Link></li>
							<li><Link to="/admin">Admin</Link></li>
							<li><Link to="/admin/416">Admin416</Link></li>
							<li><Link to="/admin/profile">Profile</Link></li>
						</ul>
					</nav>
					<Route path="/" exact component={Home}/>
					<Route path="/todolist" component={TodoList}/>
					<Route path="/user/:id" component={User}/>
					<Route path="/about" render={()=><h2>About</h2>} />
					<ProtectRoute path="/admin" component={Admin}/>
            	</div> 
        	</Router>
        )        
    }
}

export default App;