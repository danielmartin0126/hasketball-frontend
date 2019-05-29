import React from 'react';
import PlayerCard from './PlayerCard';
import '../App.css';
import ShowModal from './ShowModal'
import { directive } from '@babel/types';


class PlayersContainer extends React.Component {

	state = {
		players:[],
	}

    componentDidMount() {
			fetch('http://localhost:3000/players')
				.then(r => r.json())
				.then(data => {
					this.setState({
						players:data
					})
				})
    }




		fullName = (p) => {
			return (p.f_name + " " + p.l_name)
		}

		findPlayers = () => {
			return this.state.players.filter(p => this.fullName(p).toLowerCase().indexOf(this.props.filtered.toLowerCase()) !== -1).map(player => {
				 return <PlayerCard player={player}/>
			 })
		}

		findTeams = () => {
				return this.state.players.filter(p => 		p.team_name.toLowerCase().indexOf(this.props.filtered.toLowerCase()) !== -1).map(player => {
				return <PlayerCard player={player} />
			})
		}


		renderSearch = () => {
			let foo = [this.findTeams(), this.findPlayers()]
			return foo
		}

		renderFiftyPlayers = () => {
			return this.state.players.slice(this.props.start,this.props.end).map(player => {
			 return <PlayerCard player={player} />
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



export default PlayersContainer;
