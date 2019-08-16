import React,{ Component } from 'react';
import { 
			BrowserRouter as Router, 
			Route, 
			Link,
			Switch,
            Redirect
		} from "react-router-dom";
import Login from 'pages/login';
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';
import Err from 'common/err';
import "./App.css";
import { getUsername } from 'util'

class App extends Component{
    render(){
        const ProtectRoute = ({component:Component,...rest})=>(<Route
            {...rest}
            render={(props)=>{
                return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />)
        const LoginRoute = ({component:Component,...rest})=>(<Route
            {...rest}
            render={(props)=>{
                return getUsername() ? <Redirect to="/" /> : <Component {...props} />
            }}
        />)
        return(
        	<Router> 
            	<div className="App">
                    <Switch>
                	   <ProtectRoute exact path="/" component={Home}/>
                       <ProtectRoute exact path="/user" component={User}  />
                       <ProtectRoute path="/category" component={Category}  />				
					   <LoginRoute path="/login" component={Login}/>
                       <Route component={Err} />
                    </Switch>
            	</div> 
        	</Router>
        )        
    }
}

export default App;