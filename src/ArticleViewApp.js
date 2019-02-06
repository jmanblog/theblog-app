import React, { Component } from 'react';
import './Articleview.css';

class ArticleView extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null};

        console.log("Article constructor complete.");
    }
    
    componentDidMount() {
        console.log("The component was mounted.");
        let componentState = this;
        let componentUrl = this.props.locationData.pathname;
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
        if (this.state.loaded === false) {
            return(
                <div>Ladataan...</div>
            )
        }
        else {
            let myData = this.state.data;
            function Component() {
                return <div dangerouslySetInnerHTML={{__html: myData[0].articleContent }} />;
            }
    
            return (
                <div className="Article" id="Article">
                <h1>{myData[0].articleTitle}</h1>
                <img className="Article-image" src={myData[0].articleImage} alt={myData[0].articleTitle} />
                <div className="Article-text">{Component()}</div>
                </div>
            );
        }
    }
}

export default ArticleView;
