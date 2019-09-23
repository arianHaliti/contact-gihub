import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';

import './App.css';



const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});

  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`http://api.github.com/search/users?q=${text}`);

    setLoading(false);
    setUsers(res.data.items);
    setAlert(null);
  }
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const alertSearch = (msg, type) => {
    setAlert({ msg, type })
  }
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`http://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
    setAlert(null);
  }
  const getUsersRepos = (username) => {
    setLoading(true);
    axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`).then((res) => {

      setRepos(res.data);
      setLoading(false);
      setAlert(null);

    });

  }


  return (
    <GithubState>
      <Router>
        <div className="App" >
          <Navbar />
          <div className="container" >
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    checkClear={users.length === 0 ? false : true}
                    alertSearch={alertSearch}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' render={props => (
                <User {...props} user={user} getSingleGitHub={getUser} getUsersRepos={getUsersRepos} repos={repos} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );

}

export default App;
