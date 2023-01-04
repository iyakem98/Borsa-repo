import React from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'

const ProfileLeft = () => {
    const { user } = useSelector((state) => state.auth)
  return (
    <div className='profileLeft'>
        <div className='profileLeftTop'>
        <Image style={{width: 350, height:350, borderRadius: 18}} src = {user.profilePic}/>
        </div>
    </div>
  )
}

export default ProfileLeft