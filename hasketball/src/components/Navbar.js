import React from 'react';


class Navbar extends React.Component {







    render(){
       return( 
        <div className="ui vertically divided grid">
            <div className="one column row navbar" id="navbar">
            <h5>Welcome playername</h5>
            <h1>Hashketball</h1>
            <a href="#">Login</a>
            <a href="#">View Team</a>
            </div>
            <div className="one column row purple" id="searchbar">
                <input onChange={this.props.handleFilter}></input>
            </div>
        </div>


       )
    }




}
export default Navbar;