// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useLogin } from '../hooks/useLogin'

const ProfilePage = () => {
    const username = useLogin();
  return (
    <div>
        <h1>Profile</h1>
        Username : {username}
    </div>
  )
}

export default ProfilePage