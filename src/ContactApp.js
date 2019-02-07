import React, { Component } from 'react';
import './App.css';
import Navbar from './NavbarApp';

class Contact extends Component {

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
    return (
      <span>
      <div className="Navigation">
      <Navbar locationData={this.props.location} />
      </div>
      <div className="App">  
        <header className="App-header">

                <div className="Article" id="Article">
                <h1>Contact information</h1>
                <img className="Article-image" src="contact.jpg" alt="Contact information" />
                <button className="btn btn-info" onClick={this.handleClick} aria-pressed={this.state.isToggleOn ? 'true' : 'false'}>Toggler
                  
                </button>
                </div>
        </header>
      </div>
      </span>
    );
  }
}

export default Contact;
