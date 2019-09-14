import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css';


class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    console.log(text);

    const res = await axios.get(`http://api.github.com/search/users?q=${text}`);

    this.setState({
      loading: false,
      users: res.data.items,
      alert: null
    })
  }
  clearUsers = () => this.setState({ users: [], loading: false });

  alertSearch = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });

    // setTimeout(() => {
    //   this.setState({ alert: null })
    // }, 3000);
  }

  render() {
    const { alert, users, loading } = this.state;
    return (
      <div className="App" >
        <Navbar />
        <div className="container" >
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            checkClear={users.length === 0 ? false : true}
            alertSearch={this.alertSearch}
          />
          <Users users={users} loading={loading} />

        </div>
      </div>
    );
  }
}

export default App;
