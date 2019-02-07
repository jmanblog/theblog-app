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
            <img className="Article-image" src="privacy.jpg" alt="Privacy information" />
          </div>
          <div className="Article-text">
            <h2>Privacy is !important!</h2>
            <p>The General Data Protection Regulation (EU) 2016/679 ("GDPR") is a regulation in EU law on data protection and privacy for all individuals within the European Union (EU) and the European Economic Area (EEA). It also addresses the export of personal data outside the EU and EEA areas. The GDPR aims primarily to give control to individuals over their personal data and to simplify the regulatory environment for international business by unifying the regulation within the EU.[1] Superseding the Data Protection Directive 95/46/EC, the regulation contains provisions and requirements pertaining to the processing of personal data of individuals (formally called data subjects in the GDPR) inside the EEA, and applies to an enterprise established in the EEA or—regardless of its location and the data subjects' citizenship—that is processing the personal information of data subjects inside the EEA.</p>
          </div>
          <h1 className="Article-title">Privacy matters</h1>
          <div className="Top-banner"></div>
        </header>
      </div>
      </span>
    );
  }
}

export default Privacy;
