import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ checkClear, alertSearch, searchUsers, clearUsers }) => {

   const [text, setText] = useState('');
   const onChange = (e) => {
      setText(e.target.value);
   }
   const onSubmit = (e) => {
      e.preventDefault();
      if (text === '') {
         alertSearch('Search input is empty', 'light');

      } else {
         searchUsers(text);
      }
   }

   const onClear = () => {

      clearUsers();

   }

   return (
      <div>
         <form onSubmit={onSubmit} className="form">
            <input type="text" name="text" placeholder="Search Users..." onChange={onChange} value={text}></input>
            <input type="submit" value="search" className="btn btn-dark btn-block"></input>
         </form>
         {checkClear && <button className="btn btn-light btn-block" onClick={onClear}>Clear</button>}

      </div>
   )

}
Search.propTypes = {
   searchUsers: PropTypes.func.isRequired,
   clearUsers: PropTypes.func.isRequired,
   checkClear: PropTypes.bool.isRequired,
   alertSearch: PropTypes.func.isRequired,
}

export default Search