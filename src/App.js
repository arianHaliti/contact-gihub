import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';
import AlertState from './context/github/AlertState';

import './App.css';



const App = () => {
  const [alert, setAlert] = useState(null);

  const alertSearch = (msg, type) => {
    setAlert({ msg, type })
  }

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App" >
            <Navbar />
            <div className="container" >
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search
                      alertSearch={alertSearch}
                    />
                    <Users />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:username' component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );

}

export default App;
