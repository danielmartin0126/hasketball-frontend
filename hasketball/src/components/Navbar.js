import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'


class Navbar extends React.Component {

    render(){
       return(
        <div className="ui vertically divided grid">
            <div className="one column row navbar" id="navbar">
            <h5>Welcome playername</h5>
              <Icon.Group size='huge'>
                <Icon size='small' name='basketball ball' />
              </Icon.Group>
              <Header as='h1' content='Hashketball' />
            <Link to="/">
                <button className="ui button">Home</button>
            </Link>
            <Link to="/login">
                <button className="ui button">Login</button>
            </Link>
            <Link to="/team">
                <button className="ui button">View Team</button>
            </Link>
            </div>
            <div className="one column row purple" id="searchbar">
              <button onClick={this.props.backPage} className="ui left attached button">Prev Page</button>
              <button onClick={this.props.nextPage} className="right attached ui button">Next Page</button>
                <div className="ui input">
                <input placeholder="search team or player" onChange={this.props.handleFilter}></input>
                </div>
            </div>
        </div>


       )
    }




}
export default Navbar;
