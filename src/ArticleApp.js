import React, { Component } from 'react';

class Article extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null};

        console.log("Article constructor complete.");
    }
    
    componentDidMount() {
        console.log("The component was mounted.");
        let componentState = this;
        let componentUrl = this.props.location.pathname;
        console.log("Props.location=");
        console.log(this.props.location);
        console.log("Current url= " + componentUrl);
        let fetchUrl = "https://localhost:44362/api" + componentUrl;
        fetch(fetchUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log("JSON-data on ladattu!");
            console.log(JSON.stringify(myJson));

            console.log("Kutsutaan setState()-rutiinia.");
            componentState.setState({ loaded: true, data: myJson });
            console.log("setState()-rutiinia on kutsuttu.");
        });
    }
  
    render() {
        console.log("Aloitetaan render()");
        if (this.state.loaded === false) {
            return(
                <div>Ladataan...</div>
            )
        }
        else {
            let myData = this.state.data;

        console.log("Data luettu, kirjoitetaan.");

            return (
                <div className="Article" id="Article">
                <header className="App-header">
                <h1>{myData[0].articleTitle}</h1>
                <img src={myData[0].articleImage} alt={myData[0].articleTitle} />
                <div>{myData[0].articleContent}</div>
                </header>
                </div>
            );
        }
    }
}

export default Article;
