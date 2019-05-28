import React from 'react';
import PlayerCard from './PlayerCard';
import ShowModal from './ShowModal'
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
				this.setState( prevState => {
					return {start: prevState.start += 50,
						end: prevState.end += 50}
				})
			}
		}

		backPage = () => {
			if (this.state.start > 0) {
				this.setState( prevState => {
					return {start: prevState.start -= 50, end: prevState.end -= 50}
				})
			}
		}

    render(){
        return(
					<React.Fragment>
						<button onClick={this.backPage} className="ui left attached button">Back</button>

						<div className="ui input">
							<input type="text" placeholder="Search..."/>
						</div>
						<button onClick={this.nextPage} className="right attached ui button">Next</button>
						<div className="ui cards">
		            {this.state.players.slice(this.state.start,this.state.end).map(player => {
		               return <PlayerCard player={player} />
		            })}
						</div>
			</React.Fragment>
				)
		}


}



export default PlayersContainer;
