import React from 'react';
import PlayerCard from './PlayerCard';
import { directive } from '@babel/types';


class PlayersContainer extends React.Component {

	state = {
		players:[],
		start: 0,
		end: 50
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

		showMorePlayers = () => {
			this.setState({
				start: this.state.start += 50,
				end: this.state.end += 50
			})
		}


    render(){
        return(
					<React.Fragment>
						<button onClick={this.showMorePlayers}>More Players</button>
						<div className="ui cards">
		            {this.state.players.slice(this.state.start,this.state.end).map(player => {
		               return <PlayerCard player={player}/>
		            })}
						</div>
			</React.Fragment>
				)
		}


}



export default PlayersContainer;
