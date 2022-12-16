import React from 'react'
import './ProfileScreen.css'
import ProfileLeft from '../components/Profile/ProfileLeft'
import ProfileRight from '../components/Profile/ProfileRight'

const ProfileScreen = () => {
  return (
    <div className='profileScreen'>
      <ProfileLeft/>
      <ProfileRight/>
    </div>
  )
}

export default ProfileScreen