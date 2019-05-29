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
    start: 0,
    end: 50,
    myTeam: [],
    players: []
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

  draftPlayer = (e) => {
    const playerToDraft = this.state.players.find(p => p.api_id == e.target.id)
    this.setState((prevState) => {
      return {myTeam: [...prevState.myTeam, playerToDraft]}
    })
  }

  render() {
    return (<div className="App">

        <Navbar filter={this.state.filter} backPage={this.backPage} nextPage={this.nextPage} handleFilter={this.handleFilter}/>
        <Route path="/login" render={()=> <Login />}/>
        <Route path="/team" render={()=> <Team myTeam={this.state.myTeam}/>}/>
        <Route path="/register" render={()=> <Register />}/>
        <Route exact path="/" render ={() => <PlayersContainer  players={this.state.players} draftPlayer={this.draftPlayer} start={this.state.start} end={this.state.end} filtered={this.state.filtered}/>}/>
    </div>
    )};
}

export default App;
