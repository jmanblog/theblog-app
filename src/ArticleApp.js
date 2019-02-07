import React, { Component } from 'react';
import './App.css';
import Navbar from './NavbarApp';
import ArticleView from './ArticleViewApp';

class App extends Component {
  render() {
    return (
      <span>
      <div className="Navigation">
      <Navbar locationData={this.props.location} />
      </div>
      <div className="App">  
        <header className="App-header">
        <ArticleView locationData={this.props.location} />
        </header>
      </div>
      </span>
    );
  }
}

export default App;
