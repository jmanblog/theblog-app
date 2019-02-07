import React, { Component } from 'react';
import './Articleview.css';

class ArticleView extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null};
    }
    
    componentDidMount() {
        let componentState = this;
        let componentUrl = this.props.locationData.pathname;
        let fetchUrl = "https://localhost:44362/api" + componentUrl;
        fetch(fetchUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            componentState.setState({ loaded: true, data: myJson });
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