import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import GihubContext from '../../context/github/githubContext';

const Search = ({ alertSearch }) => {

   const githubContext = useContext(GihubContext)

   const [text, setText] = useState('');
   const onChange = (e) => {
      setText(e.target.value);
   }
   const onSubmit = (e) => {
      e.preventDefault();
      if (text === '') {
         alertSearch('Search input is empty', 'light');

      } else {
         githubContext.searchUsers(text);
      }
   }



   return (
      <div>
         <form onSubmit={onSubmit} className="form">
            <input type="text" name="text" placeholder="Search Users..." onChange={onChange} value={text}></input>
            <input type="submit" value="search" className="btn btn-dark btn-block"></input>
         </form>
         {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}

      </div>
   )

}
Search.propTypes = {

   alertSearch: PropTypes.func.isRequired,
}

export default Search