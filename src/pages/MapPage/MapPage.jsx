import React, { Component } from "react";

class MapPage extends Component {
  // Write a function that will reach out to the api and grab info from the map
  // Get all beer ie..   (look into component did mount)
  //

constructor() {
    super() 
    this.state={    
        flights: []
    }
}

componentDidMount() {
    this.getAllFlights()
}

getAllFlights = async () => {
    try{
        const allFlights = await fetch(process.env.REACT_APP_BACKEND_URL+"/allFlights")
        const parsedAllFlights = await allFlights.json()
        console.log(parsedAllFlights)
        this.setState({
            flights: parsedAllFlights.data
        })
    } catch(error) {
        console.log(error)
    }
}


  render() {
    return <div></div>;
  }
}

export default MapPage;
