import React, { Component } from 'react';

class ArticleList extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null};
        console.log("Article constructor complete.");
    }
    
    componentDidMount() {
        console.log("ArticleList mounted.");
        let articlelistState = this;
        console.log(this.props.locationData);
        let componentUrl = this.props.locationData.pathname;
        fetch('https://localhost:44362/api' + componentUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(articleJson) {
            console.log(JSON.stringify(articleJson));
            articlelistState.setState({ loaded: true, data: articleJson });
        });
    }
  
    render() {
        console.log("Aloitetaan articlelist render()");
        console.log(this.state.data);
        
        if (this.state.loaded === false) {
            return(
                <div>Ladataan...</div>
            )
        }
        else {
            let articleData = this.state.data;
            let articleRows = [];

            for (var i = 0; i < articleData.length; i++) {
                let dataId = articleData[i];
                let imageUrl = window.location.origin + "/article/" + dataId.articleImage;
                let articleUrl = window.location.origin + "/article/" + dataId.articleShort.trim();
                articleRows.push(
                    <a href={articleUrl}>
                    <div className="ArticleLink">
                    <h1>{dataId.articleTitle}</h1>
                    <img src={imageUrl} alt={dataId.articleShort} height="200px"></img>
                    <p>{dataId.articleContent}</p>
                    </div>
                    </a>
                );
            }

            return (
                <div className="ArticleList" id="Article">
                <header className="App-header">
                <h1>Artikkelilista</h1>
                {articleRows}
                </header>
                </div>
            );
        }
    }
}

export default ArticleList;
