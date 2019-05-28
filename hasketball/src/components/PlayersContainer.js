import React from 'react';
import PlayerCard from './PlayerCard';
import '../App.css';
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

		nextPage = () => {
			if (this.state.end > this.state.players.length) {
		 	}
			else {
				this.setState({
					start: this.state.start += 50,
					end: this.state.end += 50
				})
			}
		}

		backPage = () => {
			if (this.state.start > 0) {
				this.setState({
					start: this.state.start -= 50,
					end: this.state.end -= 50
				})
			}
		}


		fullName = (p) => {
			return (p.f_name + " " + p.l_name)
		}


	


    render(){
        return(
					<React.Fragment>
						<button onClick={this.backPage}>Back Page</button>
						<button onClick={this.nextPage}>Next Page</button>
						<div className="ui cards">
								{this.state.players.filter(p => this.fullName(p).toLowerCase().indexOf(this.props.filtered.toLowerCase()) !== -1).map(player => {
		               return <PlayerCard player={player}/>})}
						</div>

			</React.Fragment>
				)
		}


}



export default PlayersContainer;
