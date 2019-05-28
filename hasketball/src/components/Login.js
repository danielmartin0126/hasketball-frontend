import React from 'react';
import {Link} from 'react-router-dom';


class Login extends React.Component {

    render() {
       return( 
       <div>
        <h1>Login</h1>
        <form className="ui input">
            <input className="ui input"></input>
            <input type="password" className="ui input"></input>
            <input type="submit" className="ui button"></input>
        </form>
        <Link to="/register">
                <button className="ui button">Register</button>
        </Link>
       </div>
       )}



}
export default Login;
