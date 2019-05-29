import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import teamLogos from '../teamLogos'


class ShowModal extends React.Component {
  state = {
    playerStats: []
  }

  showStats = (e) => {
    fetch("https://www.balldontlie.io/api/v1/season_averages?player_ids[]=" + `${e.target.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        playerStats: data.data[0]
      })
      })
  }



  render(){
    return(
      <Modal trigger={<div id={this.props.player.api_id} onClick={this.showStats} className="ui basic blue button">View Stats</div>}>
        <Modal.Header>{this.props.player.f_name +" "+ this.props.player.l_name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src={teamLogos[this.props.player.team_name]} />
          <Modal.Description>
            <Header>2018 Season Averages</Header>
            <ul>
              <p>{this.state.playerStats ? "Points: " + this.state.playerStats.pts : null}</p>
              <p>{this.state.playerStats ? "Assists: " + this.state.playerStats.ast : null}</p>
              <p>{this.state.playerStats ? "Games Played: " + this.state.playerStats.games_played : null}</p>
              <p>{this.state.playerStats ? "Minutes Played: " + this.state.playerStats.min : null}</p>

            </ul>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ShowModal
