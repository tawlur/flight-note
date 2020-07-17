import React, { Component } from "react";

class MapPage extends Component {
  // Write a function that will reach out to the api and grab info from the map
  // Get all beer ie..   (look into component did mount)
  //

constructor() {
    super() 
    this.state={    
        feed: [],
        messages: []
    }
}

//response.response.feedMessageResponse.messages.messages

componentDidMount() {
    this.getAllMessages()
}

getAllMessages = async () => {
    try{
        const allMessages = await fetch(process.env.REACT_APP_BACKEND_URL+"/allFlights")
        const parsedAllMessages = await allMessages.json()
        // console.log(parsedAllFlights)
        this.setState({
            messages: parsedAllMessages.response.feedMessageResponse.messages.message
        })
    } catch(error) {
        console.log(error)
    }
}

  render() {
      const message = this.state.messages
      console.log(message)

        return(
            <div>
                {this.state.messages.map(message => {
                  return(
                  <p>
                      {message.altitude}
                     {message.longitude}
               </p>
                  )
                  })}
            </div>
    );
  }
}

export default MapPage;

