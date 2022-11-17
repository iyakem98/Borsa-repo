import React from 'react'
import { useState, useEffect } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye} from 'react-icons/fa';
import { ChatState } from '../../../context/chatProvider'
import { getSenderFull } from '../ChatConfig/ChatLogics'
import './ChatBoxHeader.css'

const ChatBoxHeader = () => {
    const { user } = useSelector((state) => state.auth)
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  return (
    <div className='chbhd'>

            {selectedChat? (
              <div className='chbhd1'>
                <h4>{getSenderFull(user, selectedChat.users).firstName}</h4>
                <FaEye className='eye' size={30}/>
              </div>
                
            ): (
              <h4 className='text-primary'>Hello {user.firstName}!</h4>
            )}

          

    </div>
  )
}

export default ChatBoxHeader