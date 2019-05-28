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
    filtered: ""
  }

  handleFilter = (e) => {
    this.setState({
      filtered: e.target.value
    })
  }

  render() {
    return (<div className="App">

        <Navbar filter={this.state.filter} handleFilter={this.handleFilter}/>
        <Route path="/login" render={()=> <Login />}/>
        <Route path="/team" render={()=> <Team />}/>
        <Route path="/register" render={()=> <Register />}/>
        <Route exact path="/" render ={() => <PlayersContainer filtered={this.state.filtered}/>}/>
    </div>
    )};
}

export default App;
