import React, { Component } from 'react';

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
                    myRows.push(
                        <h2><a href={mainTopicUrl}>{dataId.mainTopicName}</a></h2>
                    );
                }                     
                
                myRows.push(
                    <p><a href={subTopicUrl}>{subTopicTitle}</a></p>
                );

                previousMainTopicName = dataId.mainTopicName;
            }

            return (
                <div className="App" id="TopicsApp">
                <header className="App-header">
                    {myRows}
                </header>
                </div>
            );
        }
    }
}

export default Topics;
