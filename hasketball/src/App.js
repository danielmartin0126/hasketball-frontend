import React from 'react';
import './App.css';
import PlayersContainer from './components/PlayersContainer';
import Navbar from './components/Navbar';
import { Route, withRouter } from 'react-router-dom'
import Login from './components/Login';
import Team from './components/Team';
import Register from './components/Register';
import Users from './components/Users'



class App extends React.Component {

  state= {
    filtered: "",
    currentUser: null,
    start: 0,
    end: 50,
    myTeam: [],
    players: [],
    availablePlayers: [],
    drafts: []
  }

    componentDidMount() {
      fetch('https://hashketball-backend.herokuapp.com/api/v1/players')
        .then(r => r.json())
        .then(data => {
          this.setState({
            players:data
          })
        })
    }

  nextPage = () => {
    if (this.state.end > 575) {
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

  handleFilter = (e) => {
    this.setState({
      filtered: e.target.value
    })
  }

  handleUserLogin = (user) => {
    fetch('https://hashketball-backend.herokuapp.com/api/v1/drafts')
      .then(r => r.json())
      .then(data => {
        this.setState({
          availablePlayers: this.state.players.filter(p => !data.find(d => d.player_id === p.id)),
          myTeam: data.filter(d => d.user_id === user.id).map(drafted => this.state.players.find(p => p.id == drafted.player_id)),
          drafts: data.filter(d => d.user_id === user.id)
        })
      })
    fetch(`https://hashketball-backend.herokuapp.com/api/v1/users/${user.id}`)
      .then(r => r.json())
      .then(data => {
        this.setState({
          currentUser: {...user,
            team_name: data.team_name}
        })
      }
    )
  }

  handleLogout =() => {
    this.setState({
      currentUser: null,
      myTeam: []
    })
  }


  handleCreateAccount = (user) => {
    this.setState({
      currentUser: user
    })
  }


    draftPlayer = (e) => {
      const playerToDraft = this.state.players.find(p => p.api_id == e.target.id)
      if (!this.state.myTeam.includes(playerToDraft)) {
        fetch('https://hashketball-backend.herokuapp.com/api/v1/draft', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            user_id: this.state.currentUser.id,
            player_id: playerToDraft.id
          })
        })
        .then(res => res.json())
        .then(data => {
          this.setState((prevState) => {
            return {
              myTeam: [...prevState.myTeam, playerToDraft],
              drafts: [...prevState.drafts, data]
            }
          })
        })
      }
    }

  dropPlayer = (e) => {
    const playerToDrop = this.state.myTeam.find(p => p.api_id == e.target.id)
    const draftDelete = this.state.drafts.find(d => d.user_id === this.state.currentUser.id && d.player_id === playerToDrop.id)
    const playersToKeep = this.state.myTeam.filter(p => p.api_id != e.target.id)
    fetch(`https://hashketball-backend.herokuapp.com/api/v1/drafts/${draftDelete.id}`, {
      method: "DELETE"
    })
    .then(data => {
      this.setState(
        { myTeam: playersToKeep }
      )
    })
  }

  render() {
    return (<div className="App">
        <Navbar
          filter={this.state.filter}
          handleFilter={this.handleFilter}
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
          backPage={this.backPage}
          nextPage={this.nextPage}
        />
        <Route path="/login" render={()=> <Login handleUserLogin={this.handleUserLogin} currentUser={this.state.currentUser}/>}/>
        <Route path="/team" render={()=> <Team currentUser={this.state.currentUser} myTeam={this.state.myTeam} dropPlayer={this.dropPlayer}/>}/>
        <Route path="/register" render={()=> <Register currentUser={this.state.currentUser} />}/>
        <Route exact path="/" render ={() => <PlayersContainer availablePlayers={this.state.availablePlayers} filtered={this.state.filtered} currentUser={this.state.currentUser} myTeam={this.state.myTeam} players={this.state.players} draftPlayer={this.draftPlayer} dropPlayer={this.dropPlayer} start={this.state.start} end={this.state.end}/>} />
        <Route extact path="/users" render={()=> <Users players={this.state.players} currentUser={this.state.currentUser} draftPlayer={this.draftPlayer} myTeam={this.state.myTeam} dropPlayer={this.dropPlayer} /> } />
    </div>
    )};
}



export default withRouter(App);
