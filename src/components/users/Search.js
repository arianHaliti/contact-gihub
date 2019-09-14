import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
   static propTypes = {
      searchUsers: PropTypes.func.isRequired,
      clearUsers: PropTypes.func.isRequired,
      checkClear: PropTypes.bool.isRequired,
      alertSearch: PropTypes.func.isRequired,
   }
   state = {
      text: ''
   }
   onChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }
   onSubmit = (e) => {
      e.preventDefault();
      if (this.state.text === '') {
         this.props.alertSearch('Search input is empty', 'light');

      } else {
         this.props.searchUsers(this.state.text);
      }
   }

   onClear = () => {

      this.props.clearUsers();

   }
   render() {
      return (
         <div>
            <form onSubmit={this.onSubmit} className="form">
               <input type="text" name="text" placeholder="Search Users..." onChange={this.onChange} value={this.state.text}></input>
               <input type="submit" value="search" className="btn btn-dark btn-block"></input>
            </form>
            {this.props.checkClear && <button className="btn btn-light btn-block" onClick={this.onClear}>Clear</button>}

         </div>
      )
   }
}

export default Search