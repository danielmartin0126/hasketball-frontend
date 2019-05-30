import React from 'react';
import PlayerCard from './PlayerCard';
import '../App.css';
import ShowModal from './ShowModal'
import { directive } from '@babel/types';
import { withRouter } from 'react-router-dom';



class PlayersContainer extends React.Component {


		fullName = (p) => {
			return (p.f_name + " " + p.l_name)
		}

		findPlayers = () => {
			return this.props.players.filter(p => this.fullName(p).toLowerCase().indexOf(this.props.filtered.toLowerCase()) !== -1).map(player => {
				 return <PlayerCard myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player}/>
			 })
		}

		findTeams = () => {
				return this.props.players.filter(p => 		p.team_name.toLowerCase().indexOf(this.props.filtered.toLowerCase()) !== -1).map(player => {
				return <PlayerCard myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} />
			})
		}


		renderSearch = () => {
			let foo = [this.findTeams(), this.findPlayers()]
			return foo
		}

		renderFiftyPlayers = () => {
			return this.props.players.slice(this.props.start,this.props.end).map(player => {
			 return <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} />
			})
		}


    render(){
        return(
					<React.Fragment>
						<div className="ui cards">
								{this.props.filtered.length > 0 ? this.renderSearch() : this.renderFiftyPlayers()}
						</div>
			</React.Fragment>
				)
		}


}



export default withRouter(PlayersContainer);
