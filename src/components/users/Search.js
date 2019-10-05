import React, { useState, useContext } from 'react'
import GihubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext'

const Search = () => {

   const githubContext = useContext(GihubContext)
   const alertContext = useContext(AlertContext);

   const [text, setText] = useState('');
   const onChange = (e) => {
      setText(e.target.value);
   }
   const onSubmit = (e) => {
      e.preventDefault();
      if (text === '') {
         alertContext.alertSearch('Search input is empty', 'light');
         githubContext.searchUsers('');

      } else {
         alertContext.removeAlert();
         githubContext.searchUsers(text);
      }
   }



   return (
      <div>
         <form onSubmit={onSubmit} className="form">
            <input type="text" name="text" placeholder="Search Users..." onChange={onChange} value={text}></input>
            <input type="submit" value="search" className="btn btn-dark btn-block"></input>
         </form>
         {githubContext.users !== null && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}

      </div>
   )

}


export default Search