import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import './App.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomePage from '../HomePage/HomePage';
import MapPage from '../MapPage/MapPage'
import GoogleMapPage from '../GoogleMapPage/GoogleMapPage'
import LoginPage from '../LoginPage/LoginPage'
import SignupPage from '../SignupPage/SignupPage'
import userService from '../../utils/userService';
import MapBoxPage from '../MapBoxPage/MapBoxPage';

class App extends Component {
  state = {
    user: userService.getUser(),
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null }, () => this.props.history.push('/'));
  }

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    }, () => {
      this.props.history.push('/');
    });
  }
  render() {
    return (
        <div className="App">
        <header className="App-header">
         Hike Note
          <nav>
            {userService.getUser() ?
              <>
                {userService.getUser().name ? `Welcome, ${userService.getUser().name.toUpperCase()}` : ''}
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/logout' onClick={this.handleLogout}>LogOut</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/mapPage'>Map Page</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/'>Home Page</NavLink>
              </>
              :
              <>
                <NavLink exact to='/signup'>SIGNUP</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/login'>LOGIN</NavLink>
                &nbsp;&nbsp;&nbsp;

              </>
            }
                            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lexend+Zetta&display=swap');
                </style>
          </nav>
        </header>          <div className='page_container'>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path='/mapPage' component={MapPage} exact />
            <Route path='/googleMapPage' component={GoogleMapPage} exact />
            <Route path='/mapBoxPage' component={MapBoxPage} exact />
            <Route exact path='/signup' render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} /> }/>
            <Route exact path='/login' render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} /> }/>
          </Switch>
          </div>
          <Footer id='footer'/>
        </div>
         
    );
  }
}

// Ok cool. I would start with creating a model for user that has... 
// name email password, and any other fields you want. then go into server.js 
// and write the logic for authentication. Do you have a good reference for this 
// stuff?


export default App;
