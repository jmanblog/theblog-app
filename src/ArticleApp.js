import React, { Component } from 'react';
import './App.css';
import Navbar from './NavbarApp';
import ArticleView from './ArticleViewApp';

class App extends Component {
  render() {
    console.log("App gives location:");
    console.log(this.props.location);

    return (
      <span>
      <div className="Navigation">
        <Navbar />
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
