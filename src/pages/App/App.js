import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import './App.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomePage from '../HomePage/HomePage';
import MapPage from '../MapPage/MapPage'
import LoginPage from '../LoginPage/LoginPage'
import SignupPage from '../SignupPage/SignupPage'
import userService from '../../utils/userService';

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
          React Puppies CRUD
          <nav>
            {userService.getUser() ?
              <>
                {userService.getUser().name ? `WELCOME, ${userService.getUser().name.toUpperCase()}` : ''}
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/'>PUPPIES LIST</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/add'>ADD PUPPY</NavLink>
              </>
              :
              <>
                <NavLink exact to='/signup'>SIGNUP</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/login'>LOGIN</NavLink>
                &nbsp;&nbsp;&nbsp;
              </>
            }
          </nav>
        </header>          <div className='page_container'>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path='/mapPage' component={MapPage} exact />
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
