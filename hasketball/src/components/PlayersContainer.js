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
        



    render(){
        return(
				<div className="ui cards">
					<p>hi</p>
            {this.state.players.slice(this.state.start,this.state.end).map(player => {
               return <PlayerCard player={player}/>
            })}
				</div>
				)
		}


}



export default PlayersContainer;