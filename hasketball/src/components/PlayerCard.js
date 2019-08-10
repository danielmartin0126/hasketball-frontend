import React from 'react';
import ShowModal from './ShowModal'
import { withRouter } from 'react-router-dom';



class PlayerCard extends React.Component {

	fullName = () => {
		return `${this.props.player.f_name} ${this.props.player.l_name}`
	}

	playerCardButtonManager = () => {
		if (this.props.myTeam.includes(this.props.player)) {
			return <div className="ui two buttons"><div className="ui basic red button" onClick={this.props.dropPlayer} id={this.props.player.api_id}>Drop</div><ShowModal id={this.props.player.api_id} player={this.props.player} className="modal"/></div>
		} else if (this.props.location.pathname === "/users" && !this.props.myTeam.includes(this.props.player)) {
			return <div><ShowModal id={this.props.player.api_id} player={this.props.player} className="modal"/> </div>
		} else {
			return <div className="ui two buttons"><div className="ui basic green button" onClick={this.props.draftPlayer} id={this.props.player.api_id}>Draft</div> <ShowModal id={this.props.player.api_id} player={this.props.player} className="modal"/> </div>
		}
	}

	handleButtons = () => {
		// console.log("handleButtons", this.props.currentUser)
		return this.props.currentUser !== null ? this.playerCardButtonManager() : <ShowModal id={this.props.player.api_id} player={this.props.player} className="modal"/>
	}

	render(){
		return(
			<div className="card" id={this.props.player.api_id}>
		    <div className="content">
		      <div className="header">
		        {this.fullName()}
		      </div>
		      <div className="meta">
		        Postion: {this.props.player.position}
		      </div>

		    </div>
		    <div className="extra content">
		      {this.handleButtons()}
		    </div>
		  </div>
		)
	}
}

export default withRouter(PlayerCard);
