import React, { Component } from 'react';
import './App.css';
import './Articleview.css';
import Navbar from './NavbarApp';

class Contact extends Component {

  render() {
    return (
      <span>
      <div className="Navigation">
      <Navbar locationData={this.props.location} />
      </div>
      <div className="App">  
        <header className="App-header">
          <div className="Article" id="Article">
            <img className="Article-image" src="contact.jpg" alt="Contact information" />
          </div>
          <div className="Article-text">
            <h2>GitHub</h2>
            <p>Frontend: <a className="Article-link" href="https://github.com/jmanblog/theblog-app">jmanblog/theblog-app</a></p>
            <p>Backend: <a className="Article-link" href="https://github.com/jmanblog/theblog">jmanblog/theblog</a></p>
          </div>
          <h1 className="Article-title">Here there be some information</h1>
          <div className="Top-banner"></div>
        </header>
      </div>
      </span>
    );
  }
}

export default Contact;
