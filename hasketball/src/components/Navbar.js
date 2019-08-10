import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class Navbar extends React.Component {

    renderSearch = () => {
        return (
            <div>
                <button onClick={this.props.backPage} className="ui left attached inverted button">Prev Page</button>
                <button onClick={this.props.nextPage} className="right attached ui inverted button">Next Page</button>
                <div className="ui input">
                <input placeholder="search team or player" onChange={this.props.handleFilter}></input>
                </div>
          </div>
        )
    }

    render(){
       return(
        <div className="ui vertically divided grid">
            <div className="one column row navbar" id="navbar">

            <h5>{this.props.currentUser ? `Welcome ${this.props.currentUser.name}` : "Sign up"}</h5>
              <Icon.Group size='huge'>
                <Icon size='small' name='basketball ball' />
              </Icon.Group>
              <Header as='h1'id="title_header" content='Hashketball' />
              <div>
                    <Link to="/">
                        <button className="ui inverted button">Home</button>
                    </Link>
                    {this.props.currentUser ?  <Link to="/login">
                        <button className="ui inverted button" onClick={this.props.handleLogout}>Logout</button>
                    </Link>
                        :
                    <Link to="/login">
                        <button className="ui inverted button">Login</button>
                    </Link>
                        }
                    <Link to="/team">
                        <button className="ui inverted button">View Team</button>
                    </Link>
                    <Link to="/users">
                      <button className="ui inverted button">View Users</button>
                    </Link>
                </div>
            </div>
            <div className="one column row" id="searchbar">
                {this.props.location.pathname === "/" ? this.renderSearch() : null }
          </div>
        </div>


       )
    }




}
export default withRouter(Navbar);
