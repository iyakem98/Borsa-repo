import React from 'react'
import { useState, useEffect } from 'react'
import {Form, Button, Row, Col, Image} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye} from 'react-icons/fa';
import { ChatState } from '../../context/chatProvider'
import { getSenderFull } from './ChatConfig/ChatLogics'
import './ChatHeader.css'


const ChatHeader = () => {
    const { user } = useSelector((state) => state.auth)
    const {selectedChat} = ChatState()
  return (
    <div className='chd bg-light'>
        {selectedChat? (
            <div className='chd1'>
                <h2 className='text-secondary'>{getSenderFull(user, selectedChat.users).firstName} {getSenderFull(user, selectedChat.users).lastName}</h2>
                <Image className='chd1im' src = {getSenderFull(user, selectedChat.users).profilePic}/>
            </div>
            
       
        ):(
            <h3 className='text-secondary'>My Chats</h3>
        )}
        

            
       
        
    </div>
  )
}

export default ChatHeader