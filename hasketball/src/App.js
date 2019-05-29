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
    players: []
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
    console.log("in handle userlogin",user)
    this.setState({
      currentUser: user
    },console.log("State",this.state))
  }

  handleLogout =() => {
    this.setState({
      currentUser: null
    })
  }

  handleCreateAccount = (user) => {
    console.log("create", user)
  }

    draftPlayer = (e) => {
    const playerToDraft = this.state.players.find(p => p.api_id == e.target.id)
    this.setState((prevState) => {
      return {myTeam: [...prevState.myTeam, playerToDraft]}
    })
  }

  dropPlayer = (e) => {
    console.log(e.target.id)
    const playersToKeep = this.state.myTeam.filter(p => p.api_id != e.target.id)
    console.log(playersToKeep)
    this.setState({
      myTeam: playersToKeep
    })
  }

  render() {
    console.log("App is rendering",this.state)
    return (<div className="App">
        <Navbar filter={this.state.filter} handleFilter={this.handleFilter} currentUser={this.state.currentUser} handleLogout={this.handleLogout} backPage={this.backPage} nextPage={this.nextPage}/>
        <Route path="/login" render={()=> <Login handleUserLogin={this.handleUserLogin} currentUser={this.state.currentUser}/>}/>
        <Route path="/team" render={()=> <Team currentUser={this.state.currentUser} myTeam={this.state.myTeam} dropPlayer={this.dropPlayer}/>}/>
        <Route path="/register" render={()=> <Register currentUser={this.state.currentUser} handleCreateAccount={this.handleCreateAccount}/>}/>
        <Route exact path="/" render ={() => <PlayersContainer filtered={this.state.filtered} currentUser={this.state.currentUser} myTeam={this.state.myTeam} players={this.state.players} draftPlayer={this.draftPlayer} dropPlayer={this.dropPlayer} start={this.state.start} end={this.state.end}/>}/>

    </div>
    )};
}

export default withRouter(App);
