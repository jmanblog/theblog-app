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
        <header className="App-header">
        <h1>Frontpage</h1>
        <a href="articles">Articles</a>
        <Topics />
        <ArticleList locationData={this.props.location} />
        </header>
      </div>
    );
  }
}

export default App;
