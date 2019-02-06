import React, { Component } from 'react';
import './App.css';
import Navbar from './NavbarApp';

class Contact extends Component {
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

                <div className="Article" id="Article">
                <h1>Contact information</h1>
                <img className="Article-image" src="contact.jpg" alt="Contact information" />
                </div>

        </header>
      </div>
      </span>
    );
  }
}

export default Contact;
