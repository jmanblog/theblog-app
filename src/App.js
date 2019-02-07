import React, { Component } from 'react';
import './App.css';
import ArticleList from './ArticleListApp';
import Navbar from './NavbarApp';

class App extends Component {
  render() {

    return (
      <span>
      <div className="Navigation">
        <Navbar locationData={this.props.location} />
      </div>
      <div className="App">  
        <header className="App-header">
        <ArticleList locationData={this.props.location} />
        </header>
      </div>
      </span>
    );
  }
}

export default App;
