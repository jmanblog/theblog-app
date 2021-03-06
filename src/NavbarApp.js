import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { loaded: false, data: null, activeButton: null};
        this.isButtonPressed = this.isButtonPressed.bind(this);
        }

            
    componentDidMount() {
        let componentState = this;
        fetch('https://localhost:44362/api/topics')
        .then(function(response) {
            return response.json();
        })
        .then(function(topicJson) {
            componentState.setState({ loaded: true, data: topicJson, activeButton:"componentUrl" });
        });
    }

    isButtonPressed(buttonRoute) {
        let thisButtonState = false;
        let urlPath = this.props.locationData.pathname;
        if (urlPath.indexOf(buttonRoute) !== -1) {
            thisButtonState = true;
        }
        return thisButtonState;
    
    }


  
    render() {
        if (this.state.loaded === false) {
            return(
                <div>Ladataan...</div>
            )
        }
        else {
            let myData = this.state.data;
            
            let myRows = [];
            let buttonMain = [];
            let buttonList = [];
            let generateMainButton = false;

            for (var i = 0; i < myData.length; i++) {
                let dataId = myData[i];
                let mainTopicUrl = "/main/" + dataId.mainTopicName;
                let subTopicUrl = "/sub/" + dataId.subTopicName;
                let subTopicTitle = dataId.subTopicName + " (" + dataId.articleCount + ")";

                //when reaching the end of mainTopic or end of all topics -> generate mainTopic button containing all subtopics
                if (i + 1 !== myData.length) {
                    if (myData[i+1].mainTopicName !== dataId.mainTopicName) {
                        generateMainButton = true;
                    }
                } else {
                    generateMainButton = true;
                }
                
                //regardless of maintopic, add button for subtopic for each i
                buttonList.push(
                    <a className="dropdown-item" href={subTopicUrl} key={dataId.subTopicName}>{subTopicTitle}</a>
                );

                //generate row for myRows by combining content of buttonList and new buttonMain
                if (generateMainButton) {

                    buttonMain.push(
                        <a href={mainTopicUrl} className={this.isButtonPressed(dataId.mainTopicName) ? 'btn btn-outline-info btn-lg' : 'btn btn-info btn-lg'} role="button" key={dataId.mainTopicName}>{dataId.mainTopicName} </a>
                    );
                    buttonMain.push(
                        <button type="button" className="btn btn-info btn-lg dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" key={i}>
                        <span className="sr-only">Toggle Dropdown</span>
                        </button>
                    )

                    myRows.push(
                        <span key={i}>
                            <div className="btn-group">
                            {buttonMain}
                                <div className="dropdown-menu">
                                {buttonList}
                                </div>
                            </div>
                        </span>
                    );

                    //reset rows to be pushed for next mainTopic
                    //myRows now contains all necessary objects for current mainTopic
                    buttonMain = [];
                    buttonList = [];
                    generateMainButton = false;
                }
            }

            return (
                <div className="btn-group">
                <span className="btn-main"><a className="btn btn-outline-light btn-lg" role="button" href="/">TheBlog</a></span>
                {myRows}
                <span className="btn-main"><a href="/contact" className={this.isButtonPressed("contact") ? 'btn btn-dark btn-lg' : 'btn btn-secondary btn-lg'} role="button" >Contact</a></span>
                <span className="btn-main"><a href="/privacy" className={this.isButtonPressed("privacy") ? 'btn btn-dark btn-lg' : 'btn btn-secondary btn-lg'} role="button" >Privacy</a></span>
                
                </div>
            );
        }
    }

    
}

export default Navbar;
