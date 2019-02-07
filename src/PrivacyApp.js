import React, { Component } from 'react';
import './App.css';
import Navbar from './NavbarApp';

class Privacy extends Component {
  render() {
    return (
      <span>
      <div className="Navigation">
      <Navbar locationData={this.props.location} />
      </div>
      <div className="App">  
        <header className="App-header">
          <div className="Article" id="Article">
          <h1>Privacy matters</h1>
          <img className="Article-image" src="privacy.jpg" alt="Privacy information" />
          </div>
        </header>
      </div>
      </span>
    );
  }
}

export default Privacy;
