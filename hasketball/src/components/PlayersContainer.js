import React from 'react';
import PlayerCard from './PlayerCard';
import '../App.css';
import { withRouter } from 'react-router-dom';



class PlayersContainer extends React.Component {
		fullName = (p) => {
			return (p.f_name + " " + p.l_name)
		}

		findPlayers = () => {
			const foundPlayers = []
			if (this.props.currentUser) {
				let filteredPlayers = this.props.availablePlayers.filter(p => {
					return this.fullName(p).toLowerCase().includes(this.props.filtered.toLowerCase())
				})
				foundPlayers.push(filteredPlayers)
			} else {
				let filteredPlayers = this.props.players.filter(p => {
					return this.fullName(p).toLowerCase().includes(this.props.filtered.toLowerCase())
				})
				foundPlayers.push(filteredPlayers)
			}
			return foundPlayers
		}

		findTeams = () => {
			const foundTeam = []
			if (this.props.currentUser) {
				let filteredTeams = this.props.availablePlayers.filter(p => {
				 return p.team_name.toLowerCase().includes(this.props.filtered.toLowerCase())
			 })
			 foundTeam.push(filteredTeams)
			} else {
				 let filteredTeams = this.props.players.filter(p => {
 					return p.team_name.toLowerCase().includes(this.props.filtered.toLowerCase())
 				})
 				foundTeam.push(filteredTeams)
			}
			return foundTeam
		}


		filteredPlayersAndTeams = () => {
			let teamsAndPlayers = [...this.findTeams(), ...this.findPlayers()]
			let merged = [].concat.apply([], teamsAndPlayers);
			return merged
		}

		renderAllPlayers = () => {
			if (this.props.filtered.length > 0) {
				const pagePlayers = this.filteredPlayersAndTeams().slice(this.props.start, this.props.end)
				return pagePlayers.map(player => {
					return <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} currentUser={this.props.currentUser} />
				})

			} else {
				return this.props.players.slice(this.props.start,this.props.end).map(player => {
				 return <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} currentUser={this.props.currentUser} />
				})
			}
		}

		renderAvailablePlayers = () => {
			if (this.props.filtered.length) {
				return this.filteredPlayersAndTeams().slice(this.props.start,this.props.end).map(player => {
				 return <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} currentUser={this.props.currentUser} />
				})
			} else {
				return this.props.availablePlayers.slice(this.props.start,this.props.end).map(player => {
				 return <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} currentUser={this.props.currentUser} />
				})
			}
		}

		decideRender = () => {
			return this.props.currentUser ? this.renderAvailablePlayers() : this.renderAllPlayers()
		}




    render(){
      return(
				<React.Fragment>
					<div className="ui cards Playarea">
						{this.decideRender()}
					</div>
				</React.Fragment>
			)
		}


}



export default withRouter(PlayersContainer);
