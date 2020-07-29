import React, { Component } from "react";
import Iframe from "react-iframe";
import tokenService from "../../utils/tokenService";

class MapPage extends Component {
  constructor() {
    super();
    this.state = {
      feed: [],
      messages: [],
    };
  }

  componentDidMount() {
    this.getAllMessages();
  }

  getAllMessages = async () => {
    console.log(tokenService.getToken(), "tokenservice");
    try {
      const allMessages = await fetch("/allFlights", {
        headers: {
          Authorization: `Bearer ${tokenService.getToken()}`,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
      });
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
    console.log(process.env.REACT_APP_MAPKEY, "MAPKEY");

    return (
      <div>
        <p>SPOT GPS Map Page</p>

        <div className="App-table-group">
          <div>Altitude {message.altitude}</div>
          <div>Latitude {message.latitude}</div>
          <div>Longitude {message.longitude}</div>
        </div>

        <p>
          <Iframe
            url={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPKEY}&q=location=${message.latitude},${message.longitude}`}
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </p>
      </div>
    );
  }
}

export default MapPage;
