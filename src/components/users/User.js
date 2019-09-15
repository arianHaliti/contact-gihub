import React, { Component } from 'react'
import Spinner from '../layout/Spinner';
class User extends Component {
   componentDidMount() {
      this.props.getSingleGitHub(this.props.match.params.username);
   }
   render() {
      const {
         loading,

      } = this.props
      const {
         name
      } = this.props.user
      if (loading) {
         return <Spinner />
      } else {
         return (
            <div>
               {name}
            </div>
         )
      }
   }
}

export default User
