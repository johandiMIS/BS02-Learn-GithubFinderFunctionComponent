import React from 'react'
import UserItem from './UserItem'
import { Spinner } from '../layout/Spinner'
import PropType from 'prop-types'
export const Users = ({loading, users}) => {
  if (loading){
    return(
      <Spinner/>
    )
  }
  else{
    return (
      <div style={userStyle}>
        {users.map(user => (
            <UserItem key={user.id} user={user}/> 
        ))}
      </div>
    )
  }
}
Users.propType = {
  users: PropType.array.isRequired,
  loading: PropType.bool.isRequired
}
const userStyle = {
    display:'grid',
    gridTemplateColumns:'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default Users