import React from 'react';
import PlayerCard from './PlayerCard'
import { withRouter } from 'react-router-dom';


class Team extends React.Component {




    render() {
       return(
       <div>
         <h3>{this.props.currentUser ? this.props.currentUser.team_name : "Drafted players to view them here"}</h3>
         <div className="ui cards">
          {this.props.myTeam.map(p => <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} player={p} />)}
        </div>
       </div>
       )}



}
export default withRouter(Team);
