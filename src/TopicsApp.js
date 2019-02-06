import React, { Component } from 'react';
import './Menu.css';

class Topics extends Component {
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

            for (var i = 0; i < myData.length; i++) {
                let dataId = myData[i];
                let mainTopicUrl = "/main/" + dataId.mainTopicName;
                let subTopicUrl = "/sub/" + dataId.subTopicName;
                let subTopicTitle = dataId.subTopicName + " (" + dataId.articleCount + ")";
                
                if (previousMainTopicName !== dataId.mainTopicName) {
                    myRows.push( <br></br> );
                    myRows.push(
                        <a href={mainTopicUrl} role="button" class="btn btn-info btn-lg">{dataId.mainTopicName}</a>
                    );
                }                     
                
                myRows.push(
                    <a href={subTopicUrl} role="button" class="btn btn-outline-light btn-sm">{subTopicTitle}</a>
                );

                previousMainTopicName = dataId.mainTopicName;
            }

            return (
                <div className="Menu" id="TopicsApp">
                <header className="Menu-header">
                <nav class="nav flex-column">
                {myRows}
                </nav>
                </header>
                </div>
            );
        }
    }
}

export default Topics;
