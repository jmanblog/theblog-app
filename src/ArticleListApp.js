import React, { Component } from 'react';
import './Articlelist.css';

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
                let imageUrl = window.location.origin + "/article/icon/" + dataId.articleImage;
                let articleUrl = window.location.origin + "/article/" + dataId.articleShort.trim();
                let articleDate = new Date (dataId.articleDate);
                let formattedDate = articleDate.toDateString();
                let articleDescription = dataId.articleShort.trim() + ", " + formattedDate;
                let articleContent = dataId.articleContent.substr(0, 600) + "...";
                function Component() {
                    return <div dangerouslySetInnerHTML={{__html: articleContent }} />;
                }

                articleRows.push(
                    <div class="jumbotron" id={dataId.articleShort.trim()}>
                        <a className="article-title" href={articleUrl}>
                        <h1 class="article-topic">{dataId.articleTitle}</h1>
                            <table>
                                <tr>
                                    <td>
                                        <img className="list-image" src={imageUrl} alt={dataId.articleShort}></img>
                                    </td>
                                    <td>
                                        <p class="lead">{Component()}</p>
                                    </td>
                                </tr>
                            </table>
                            </a>
                            <hr />
                            <p className="lead">{articleDescription}</p>
                        <a class="btn btn-outline-info btn-sm" href={articleUrl} role="button">Read entire article...</a>
                    </div>
                );
            }

            return (
                <div className="ArticleList" id="Article">
                <header className="ArticleList-header">
                {articleRows}
                </header>
                </div>
            );
        }
    }
}

export default ArticleList;
