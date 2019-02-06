import React, { Component } from 'react';
import './App.css';
import Topics from './TopicsApp';
import ArticleList from './ArticleListApp';

class App extends Component {
  render() {
    console.log("App gives location:");
    console.log(this.props.location);

    return (
      <div className="App">
      <h1 className="App-title">The Journeyman Blog</h1>
        <Topics />
        <header className="App-header">
        <ArticleList locationData={this.props.location} />
        </header>
      </div>
    );
  }
}

export default App;
