import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayersContainer from './components/PlayersContainer';
import Navbar from './components/Navbar';

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
        {console.log("state",this.state.filtered)}
        <PlayersContainer filtered={this.state.filtered}/>
    </div>
    )};
}

export default App;
