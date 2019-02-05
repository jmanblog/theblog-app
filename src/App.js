import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    console.log(this.props.location);
    return (
      <div className="App">
        <header className="App-header">
        <h1>Frontpage</h1>
        </header>
      </div>
    );
  }
}

export default App;
