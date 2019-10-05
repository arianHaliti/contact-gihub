import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
   SEARCH_USERS,
   SET_LOADING,
   CLEAR_USERS,
   GET_USER,
   GET_REPOS
} from '../types'

const GithubState = props => {
   const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false
   }

   const [state, dispatch] = useReducer(GithubReducer, initialState);

   const searchUsers = async (text) => {
      if (text === "") {
         dispatch({ type: CLEAR_USERS });
         return;
      }
      setLoading();

      const res = await axios.get(`http://api.github.com/search/users?q=${text}`);

      dispatch({
         type: SEARCH_USERS,
         payload: res.data.items
      })
   }

   // Get User
   const getSingleGitHub = async (username) => {
      setLoading();
      const res = await axios.get(`http://api.github.com/users/${username}`);
      dispatch(
         {
            type: GET_USER,
            payload: res.data,
         }
      )
   }
   // Get repos 
   const getUsersRepos = (username) => {
      setLoading();
      axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`).then((res) => {

         dispatch({
            type: GET_REPOS,
            payload: res.data
         })
         // setAlert(null);

      });

   }
   // Clear Users
   const clearUsers = () => dispatch({ type: CLEAR_USERS })

   // Set Loading
   const setLoading = () => dispatch({ type: SET_LOADING })


   return <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getSingleGitHub,
      getUsersRepos
   }}>
      {props.children}
   </GithubContext.Provider>
}
export default GithubState;