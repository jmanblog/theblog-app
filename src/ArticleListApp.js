import React, { Component } from 'react';
import './Articlelist.css';

class ArticleList extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null};
        this.handleClickDateSorter = this.handleClickDateSorter.bind(this);
        this.handleClickTitleSorter = this.handleClickTitleSorter.bind(this);
    }
    
    handleClickDateSorter() {
        this.setState(state => ({
          sortDesc: !state.sortDesc,
          sorter: "articleDate"
        }));
        let buttonText = "Date ";
        let dropDownText = "Sorted: Date ";
        if (this.state.sortDesc) {
            buttonText = buttonText + "(newest)";
            dropDownText = dropDownText + "(oldest)";
        }
        else { 
            buttonText = buttonText + "(oldest)";
            dropDownText = dropDownText + "(newest)";
        }
        document.getElementById("btn-dateSorter").innerHTML=buttonText;
        document.getElementById("dropdownMenuButton").innerHTML=dropDownText;
      }

    handleClickTitleSorter() {
        this.setState(state => ({
            sortDesc: !state.sortDesc,
            sorter: "articleTitle"
        }));
        let buttonText = "Title ";
        let dropDownText = "Sorted: Title ";
        if (this.state.sortDesc) {
            buttonText = buttonText + "(ascending)";
            dropDownText = dropDownText + "(descending)";
        }
        else { 
            buttonText = buttonText + "(descending)";
            dropDownText = dropDownText + "(ascending)";
        }
        document.getElementById("btn-titleSorter").innerHTML=buttonText;
        document.getElementById("dropdownMenuButton").innerHTML=dropDownText;
    }
      
    componentDidMount() {
        let articlelistState = this;
        let componentUrl = this.props.locationData.pathname;
        let fetchSuccess = null;
        fetch('https://localhost:44362/api' + componentUrl)
            .then(function(response) {
                fetchSuccess = response.status;
                if ((fetchSuccess === 204) || (fetchSuccess === 404)) {
                    return null;
                } else {
                    return response.json();
                }
            })
            .then(function(articleJson) {
                articlelistState.setState({ loaded: true, data: articleJson, success: fetchSuccess, sorter: "articleDate", sortDesc: true,  });
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
                let errorImage = window.location.origin + "/article/error.jpg";
                return(
                    <div className="Article" id="Article">
                    <h1>Unfortunately there is nothing here</h1>
                    <img className="Article-image" src={errorImage} alt="Something went wrong" />
                    <div className="Article-text">
                    <h2>This topic does not exist. Please try to click on some other topic...</h2>
                    <p>The problem is {this.state.success}.</p>
                    </div>
                    </div>
                    )
            } else {
                //sort listed articles by sort options in this.state
                function sortByKey(array, key) {
                    return array.sort(function(a, b) {
                        var x = a[key]; var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                }
                let articleData = this.state.data;
                articleData = sortByKey(articleData, this.state.sorter);
                if (this.state.sortDesc) { articleData.reverse(); }
                console.log(articleData);
                                
                let articleRows = [];
                //generate listed articles
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
                        <div className="jumbotron" id={dataId.articleShort.trim()} key={dataId.articleId}>
                            <a className="article-title" href={articleUrl}>
                            <h1 className="article-topic">{dataId.articleTitle}</h1>
                                <table><tbody>
                                    <tr>
                                        <td>
                                            <img className="list-image" src={imageUrl} alt={dataId.articleShort}></img>
                                        </td>
                                        <td>
                                            <span className="lead">{Component()}</span>
                                        </td>
                                    </tr>
                                </tbody></table>
                                </a>
                                <hr />
                                <p className="lead">{articleDescription}</p>
                            <a className="btn btn-outline-info btn-sm" href={articleUrl} role="button">Read entire article...</a>
                        </div>
                    );
                }

                return (
                    <span>
                        <div className="ArticleList" id="Article">
                            <header className="ArticleList-header">
                                
                            <div className="dropdown" id="sorter">
                            <button className="btn btn-info dropdown-toggle btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort by...
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" id="btn-dateSorter" onClick={this.handleClickDateSorter}>Date</button>
                            <button className="dropdown-item" id="btn-titleSorter" onClick={this.handleClickTitleSorter}>Title</button>
                            </div>
                            </div>                                
                                
                            {articleRows}
                            </header>
                        </div>
                    </span>
                );
            }
        }
    }
}

export default ArticleList;
