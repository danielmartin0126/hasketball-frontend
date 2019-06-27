import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayersContainer from './components/PlayersContainer';
import Navbar from './components/Navbar';
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './components/Login';
import Team from './components/Team';
import Register from './components/Register';



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
      fetch('http://localhost:3000/api/v1/players')
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
    fetch('http://localhost:3000/api/v1/drafts')
      .then(r => r.json())
      .then(data => {
        this.setState({
          availablePlayers: this.state.players.filter(p => !data.find(d => d.player_id === p.id)),
          myTeam: data.filter(d => d.user_id === user.id).map(drafted => this.state.players.find(p => p.id == drafted.player_id)),
          drafts: data.filter(d => d.user_id === user.id)
        })
      })
    fetch(`http://localhost:3000/api/v1/users/${user.id}`)
      .then(r => r.json())
      .then(data => {
        this.setState({
          currentUser: {...user, 
            team_name: data.team_name} 
        },console.log("State",this.state))
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
    console.log("create", user)
    this.setState({
      currentUser: user
    })
  }


    draftPlayer = (e) => {
      const playerToDraft = this.state.players.find(p => p.api_id == e.target.id)
      if (!this.state.myTeam.includes(playerToDraft)) {
        fetch('http://localhost:3000/api/v1/draft', {
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
      console.log(this.state.drafts)
    })
    }
  }

  dropPlayer = (e) => {
    const playerToDrop = this.state.myTeam.find(p => p.api_id == e.target.id)
    const draftDelete = this.state.drafts.find(d => d.user_id === this.state.currentUser.id && d.player_id === playerToDrop.id)
    const playersToKeep = this.state.myTeam.filter(p => p.api_id != e.target.id)
    fetch(`http://localhost:3000/api/v1/drafts/${draftDelete.id}`, {
    method: "DELETE"
    })
      .then(data => {
        this.setState({
          myTeam: playersToKeep
      }, console.log(this.state.myTeam))
    })
   
  }

  render() {
    return (<div className="App">
        <Navbar filter={this.state.filter} handleFilter={this.handleFilter} currentUser={this.state.currentUser} handleLogout={this.handleLogout} backPage={this.backPage} nextPage={this.nextPage}/>
        <Route path="/login" render={()=> <Login handleUserLogin={this.handleUserLogin} currentUser={this.state.currentUser}/>}/>
        <Route path="/team" render={()=> <Team currentUser={this.state.currentUser} myTeam={this.state.myTeam} dropPlayer={this.dropPlayer}/>}/>
        <Route path="/register" render={()=> <Register currentUser={this.state.currentUser} />}/>
        <Route exact path="/" render ={() => <PlayersContainer availablePlayers={this.state.availablePlayers} filtered={this.state.filtered} currentUser={this.state.currentUser} myTeam={this.state.myTeam} players={this.state.players} draftPlayer={this.draftPlayer} dropPlayer={this.dropPlayer} start={this.state.start} end={this.state.end}/>}/>

    </div>
    )};
}

export default withRouter(App);
