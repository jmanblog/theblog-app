import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null};
    }
    
    componentDidMount() {
        let componentState = this;
        fetch('https://localhost:44362/api/topics')
        .then(function(response) {
            return response.json();
        })
        .then(function(topicJson) {
            console.log("topicJson loaded:");
            console.log(JSON.stringify(topicJson));
            componentState.setState({ loaded: true, data: topicJson });
        });
    }
  
    render() {
        console.log("Rendering Topics");

        if (this.state.loaded === false) {
            return(
                <div>Ladataan...</div>
            )
        }
        else {
            console.log("Props.location=");
            let myData = this.state.data;
            
            let myRows = [];
            let previousMainTopicName = "";
            let buttonMain = [];
            let buttonList = [];
            let generateMainButton = false;

            for (var i = 0; i < myData.length; i++) {
                let dataId = myData[i];
                let mainTopicUrl = "/main/" + dataId.mainTopicName;
                let subTopicUrl = "/sub/" + dataId.subTopicName;
                let subTopicTitle = dataId.subTopicName + " (" + dataId.articleCount + ")";
                
                if (i + 1 !== myData.length) {
                    console.log("Navbar: lista ei ole lopussa");
                    if (myData[i+1].mainTopicName !== dataId.mainTopicName) {
                        generateMainButton = true;
                        console.log("Navbar: seuraava listan mainTopic eri kun nykyinen. generateMainButton = " + generateMainButton);
                    }
                } else {
                    generateMainButton = true;
                    console.log("Navbar: lista on lopussa. generateMainButton = " + generateMainButton);
                }
                
                buttonList.push(
                    <a class="dropdown-item" href={subTopicUrl}>{subTopicTitle}</a>
                );

                if (generateMainButton) {

                    buttonMain.push(
                        <a href={mainTopicUrl} class="btn btn-info btn-lg" role="button">{dataId.mainTopicName}</a>
                        //<button type="button" class="btn btn-info btn-lg">{dataId.mainTopicName}</button>
                    );
                    buttonMain.push(
                        <button type="button" class="btn btn-info btn-lg dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                        </button>
                    )

                    myRows.push(
                        <span>
                            <div class="btn-group">
                            {buttonMain}
                                <div class="dropdown-menu">
                                {buttonList}
                                </div>
                            </div>
                        </span>
                    );

                    buttonMain = [];
                    buttonList = [];
                    generateMainButton = false;
                }

            }

            return (
                <div class="btn-group">
                
                <span className="btn-main"><a class="btn btn-outline-light btn-lg" role="button" href="/">JManBlog</a></span>
                {myRows}
                <span className="btn-main"><a href="/contact" class="btn btn-secondary btn-lg" role="button">Contact</a></span>
                <span className="btn-main"><a href="/privacy" class="btn btn-secondary btn-lg" role="button">Privacy</a></span>
                
                </div>
            );
        }
    }
}

export default Navbar;
