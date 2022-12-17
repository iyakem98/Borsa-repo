import React from 'react'
import './ChatScreen.css'
import { useState, useEffect } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import MyChats from '../components/Chatting/MyChats'
import ChatBox from '../components/Chatting/ChatBox'
import ChatHeader from '../components/Chatting/ChatHeader'
import FeedbackModal from '../components/Feedback/FeedbackModal'

const ChatScreen = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    /*useEffect(() => {
       
        if (!user) {
          navigate('/login')
        }
    
    
        return () => {
          dispatch(reset())
        }
      }, [user, dispatch]) */
  return (
    <div className = 'cs bg-light'>
      {/*<FeedbackModal/> */}
      <ChatHeader/>
       <div className='chsc'>
        <div className='chsclf bg-light'>
          <div className = 'chsclf1'>
              <MyChats/>
          </div>
     
         
        </div>

        <div className='chscr bg-white'>

            <ChatBox/>
        </div>

    </div>
    </div>
   
  )
}

export default ChatScreen