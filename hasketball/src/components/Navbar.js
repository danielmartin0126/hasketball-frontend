import React from 'react';
import {Link} from 'react-router-dom';


class Navbar extends React.Component {







    render(){
       return( 
        <div className="ui vertically divided grid">
            <div className="one column row navbar" id="navbar">
            <h5>{this.props.currentUser ? `Welcome ${this.props.currentUser.name}` : "Sign up you asshole"}</h5>
            <h1>Hashketball</h1>
            <Link to="/">
                <button className="ui button">Home</button>
            </Link>
            {this.props.currentUser ?  <Link to="/login">
                <button className="ui button" onClick={this.props.handleLogout}>Logout</button>
            </Link>
                : 
            <Link to="/login">
                <button className="ui button">Login</button>
            </Link>
                }
            <Link to="/team">
                <button className="ui button">View Team</button>
            </Link>
            </div>
            <div className="one column row purple" id="searchbar">
                <h2>Search</h2>
                <input onChange={this.props.handleFilter}></input>
            </div>
        </div>


       )
    }




}
export default Navbar;