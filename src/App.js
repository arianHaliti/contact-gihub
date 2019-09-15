import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import './App.css';



class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });


    const res = await axios.get(`http://api.github.com/search/users?q=${text}`);

    this.setState({
      loading: false,
      users: res.data.items,
      alert: null,
    })
  }
  clearUsers = () => this.setState({ users: [], loading: false });

  alertSearch = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });

  }
  getUser = async (username) => {

    this.setState({ loading: true });

    const res = await axios.get(`http://api.github.com/users/${username}`);

    this.setState({
      user: res.data,
      loading: false,
      alert: null,
    })
  }
  render() {
    const { alert, users, user, loading } = this.state;
    return (
      <Router>
        <div className="App" >
          <Navbar />
          <div className="container" >
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    checkClear={users.length === 0 ? false : true}
                    alertSearch={this.alertSearch}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username' render={props => (
                <User {...props} user={user} getSingleGitHub={this.getUser} loading={loading} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
