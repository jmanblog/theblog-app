import React, { Component } from 'react';
import './App.css';
import './Articleview.css';
import Navbar from './NavbarApp';

class Mistake extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    let errorImage = window.location.origin + "/article/error.jpg";
    let errorMessage = "";
    if (!this.state.success) {
        errorMessage = "There is nothing I can do.";
    }

    return (
      <span>
      <div className="Navigation">
      <Navbar locationData={this.props.location} />
      </div>
      <div className="App">  
        <header className="App-header">
          <div className="Article" id="Article">
            <img className="Article-image" src={errorImage} alt="Something went wrong" />
          </div>
          <div className="Article-text">
            <h2>This location is home to no-one at all. Try something else, please...</h2>
            <p>{errorMessage}</p>
          </div>
          <h1 className="Article-title">Unfortunately there is nothing here</h1>
          <div className="Top-banner"></div>
        </header>
        </div>
      </span>
    );
  }
}

export default Mistake;
