import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const User = (params) => {
  return (
    <h1>Welcome {params.username}</h1>
  )
}

class App extends Component {
  state = {
    isLoggedIn: false
  };

  logInHandle = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }));
  }

   render() {
    return (
      <Router>
        <div className="App">
          <NavLink to="/" exact activeStyle={{ color: "green" }}>
            Home
          </NavLink>
          <NavLink to="/about" exact activeStyle={{ color: "green" }}>
            About
          </NavLink>
          <NavLink to="/user/alpesh" exact activeStyle={{ color: "green" }}>
            Alpesh
          </NavLink>
          <NavLink to="/user/patel" exact activeStyle={{ color: "green" }}>
            Patel
          </NavLink>
          <br />
          <Prompt
            when={!this.state.isLoggedIn}
            message={(location)=>{
              return location.pathname.startsWith('/user') ? 'Are you sure want to navigate?' : true;
            }}
          />
          <input
            type="button"
            value={this.state.isLoggedIn ? "Log Out" : "Log In"}
            onClick={this.logInHandle}
          />
          <Route
            path="/"
            exact
            strict
            render={() => {
              return <h1>Welcome Home...</h1>;
            }}
          />
          <Route
            path="/about"
            exact
            strict
            render={() => {
              return <h1>Welcome About...</h1>;
            }}
          />
          {/* <Route path="/user/:username" exact component={User} /> */}
          <Route path="/user/:username" exact render={({match})=>{
            return this.state.isLoggedIn ? (<User username={match.params.username} />) : (<Redirect to="/" />)
          }} />
        </div>
      </Router>
    );
  }
}

export default App;