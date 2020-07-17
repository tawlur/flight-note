import React, { Component } from "react";

class MapPage extends Component {
  // Write a function that will reach out to the api and grab info from the map
  // Get all beer ie..   (look into component did mount)
  //

constructor() {
    super() 
    this.state={    
        feed: []
    }
}

//response.response.feedMessageResponse.messages.messages

componentDidMount() {
    this.getAllFlights()
}

getAllFlights = async () => {
    try{
        const allFlights = await fetch(process.env.REACT_APP_BACKEND_URL+"/allFlights")
        const parsedAllFlights = await allFlights.json()
        console.log(parsedAllFlights)
        this.setState({
            flights: parsedAllFlights.response
        })
    } catch(error) {
        console.log(error)
    }
}

  render() {
      const flight = this.state.flights
      console.log(flight)

        return(
            <div>
            </div>
    );
  }
}

export default MapPage;
