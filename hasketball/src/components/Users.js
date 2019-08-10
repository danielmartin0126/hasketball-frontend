import React from 'react';
import { withRouter } from 'react-router-dom';
import PlayerCard from './PlayerCard';

class Users extends React.Component {

  state= {
    users: [],
    drafts: []
  }

  componentDidMount() {
    fetch('https://hashketball-backend.herokuapp.com/api/v1/users')
    .then(r=>r.json())
    .then(data => {
      this.setState({users: data})
    })
    fetch('https://hashketball-backend.herokuapp.com/api/v1/drafts')
    .then(r=>r.json())
    .then(data => {
      this.setState({drafts: data})
    })

  }

  findUserPlayers = (userId) => {
    let teammates = []
    this.state.drafts.forEach(draft => {
      this.props.players.forEach(player => {
        if (draft.player_id === player.id && draft.user_id === userId) {
          teammates.push(player)
        }
      })
    })
    return teammates
  }

  userDivs = () => {
    return this.state.users.map(user => {
      return (
        <div>
          <div><h2>{user.team_name}</h2></div><br/>
          <div className="ui cards Playarea">
          {this.findUserPlayers(user.id).map(player => {
            return <PlayerCard dropPlayer={this.props.dropPlayer} myTeam={this.props.myTeam} draftPlayer={this.props.draftPlayer} player={player} currentUser={this.props.currentUser} />
          })}
          </div>
        </div>
      )
    })
  }


  render() {
    return (
      <div>
        <h1>All Users</h1>
        <div>
        {this.userDivs()}
        </div>
      </div>
    )
  }
}

export default withRouter(Users)
