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
        let fetchSuccess = null;
        fetch(fetchUrl)
            .then(function(response) {
                fetchSuccess = response.status;
                if ((fetchSuccess === 204) || (fetchSuccess === 404)) {
                    return null;
                } else {
                    return response.json();
                }
            })
            .then(function(myJson) {
                componentState.setState({ loaded: true, data: myJson, success: fetchSuccess });
            });
    }
  
    render() {
        if (this.state.loaded === false) {
            return(
                <div>Ladataan...</div>
            )
        } 
        
        else {
            if ((this.state.success === 204) || (this.state.success === 404)) {
                return(
                    <div className="Article" id="Article">
                    <h1>Unfortunately there was no article here</h1>
                    <img className="Article-image" src="error.jpg" alt="Something went wrong" />
                    <div className="Article-text">
                    <h2>This article does not exist. Please try to find something else to read...</h2>
                    <p>The problem is {this.state.success}.</p>
                    </div>
                    </div>
                    )
            } else {

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
}

export default ArticleView;