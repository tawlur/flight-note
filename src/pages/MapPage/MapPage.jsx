import React, { Component } from "react";
import Iframe from "react-iframe";
import tokenService from "../../utils/tokenService"
import { Link } from 'react-router-dom';


class MapPage extends Component {
  // Write a function that will reach out to the api and grab info from the map
  // Get all beer ie..   (look into component did mount)
  //

  constructor() {
    super();
    this.state = {
      feed: [],
      messages: [],
    };
  }

  //response.response.feedMessageResponse.messages.messages

  componentDidMount() {
    this.getAllMessages();
  }

  getAllMessages = async () => {
      console.log(tokenService.getToken(), "tokenservice")
    try {
      const allMessages = await fetch(
        "/allFlights", {
            headers: {
                "Authorization": `Bearer ${tokenService.getToken()}`,
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        }
      );
      const parsedAllMessages = await allMessages.json();
      // console.log(parsedAllFlights)
      this.setState({
        messages:
          parsedAllMessages.response.feedMessageResponse.messages.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const message = this.state.messages;
    console.log(message);

//const iframeUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA_fkU85khz1rmdlRMze60rE7gA9OTT3TU&q=location=${message.latitude},${message.longitude}`

    return (
      <div>
        {/* {this.state.messages.map((message) => { */}
          {/* return ( */}
            <p>
              Altitude {message.altitude} 
              Latitude {message.latitude}
              Longitude {message.longitude}

              <Iframe
                url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA_fkU85khz1rmdlRMze60rE7gA9OTT3TU&q=location=${message.latitude},${message.longitude}`}
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              />
            </p>
            <div className='panel-footer'>
                <Link className='btn btn-xs btn-warning' to={{ pathname: '/edit', state: {clickedOnPuppy: puppyFromParent}  }}>EDIT</Link>
                <button
                    className='btn btn-xs btn-danger margin-left-10'
                    onClick={() => handleDeletePuppy(puppyFromParent._id)}
                >
                    DELETE
                </button>
            </div>
          {/* ); */}
        {/* })} */}
      </div>
    );
  }
}

export default MapPage;

// AIzaSyA_fkU85khz1rmdlRMze60rE7gA9OTT3TU

// "latitude": 39.73318,
// "longitude": -104.99144,