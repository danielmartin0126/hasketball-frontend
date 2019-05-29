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
    end: 50
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

  render() {
    return (<div className="App">

        <Navbar filter={this.state.filter} backPage={this.backPage} nextPage={this.nextPage} handleFilter={this.handleFilter}/>
        <Route path="/login" render={()=> <Login />}/>
        <Route path="/team" render={()=> <Team />}/>
        <Route path="/register" render={()=> <Register />}/>
        <Route exact path="/" render ={() => <PlayersContainer start={this.state.start} end={this.state.end} filtered={this.state.filtered}/>}/>
    </div>
    )};
}

export default App;
