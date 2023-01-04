import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import {MdLocationOn} from 'react-icons/md'
import ProfileTabs from './ProfileTabs'
import './Profile.css'
const ProfileRight = () => {
    const { user } = useSelector((state) => state.auth)
  return (
    <div className='profileRight'>
        <div className='profileTop'>
            <div style={{display: 'flex'}}>
               <div style={{display: 'flex'}}>
                    <h3 style={{marginRight: 7}}>{user.firstName}  </h3>
                    <h3 style={{marginRight: 6}}> {user.lastName}</h3>
               </div>
               <div style={{display: 'flex', marginTop: 8}}>
                <MdLocationOn size={20} color = '#a991d4'/>
                <p style = {{color: 'gray', marginRight: 4, fontSize: 14}}>{user.city},</p>
                <p style = {{color: 'gray', fontSize: 14}}>{user.country}</p>
            </div>
            </div>
            <div>
            {user.isTraveler? (
                 <p className='text-success' style={{fontWeight: 'bold', fontSize: 18}}>
                    Traveler
                 </p>
               ) : (
                <p className='text-primary' style={{fontWeight: 'bold', fontSize: 18}}>
                Buyer
             </p>
               )}
            </div>
           
        </div>

        <div className='profileBottom'>
                <ProfileTabs/>
        </div>
    </div>
  )
}

export default ProfileRight