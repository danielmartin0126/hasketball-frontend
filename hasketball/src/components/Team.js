import React from 'react';
import {Link} from 'react-router-dom';
import PlayerCard from './PlayerCard'


class Team extends React.Component {
    render() {
       return(
       <div>
         <h3>My Team</h3>
         <div className="ui cards">
          {this.props.myTeam.map(p => <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} player={p} />)}
        </div>
       </div>
       )}



}
export default Team;
