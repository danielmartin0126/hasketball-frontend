import React from 'react';
import {Link} from 'react-router-dom';


class Register extends React.Component {

    render() {
       return( 
       <div>
        <h1>Create New Account</h1>
        <form className="ui input">
            <input className="ui input"></input>
            <input type="password" className="ui input"></input>
            <input type="submit" className="ui button"></input>
        </form>
       </div>
       )}



}
export default Register;
