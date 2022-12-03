// This page displays a list of every chat the user have had on the app

import React from 'react'
import {Row, Col, Button, Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { fetchChat, reset } from '../../features/chat/chatSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading'
import SingleChat from './SingleChat'
import ChatProvider from '../../context/chatProvider'
import { ChatState } from '../../context/chatProvider'
import { getSender, getSenderFull } from './ChatConfig/ChatLogics'
import { Card } from 'react-bootstrap'
import './LeChat.css'


const MyChats = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth) //Gets user info from redux 
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState(); // gets global chat states from context api
    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat) // gets chat states from redux

    /* This useEffect calls the backend but not directly. Instead, it calls the fetchChat() function from the redux code
    using dispatch, which in turn calls the backend. Once this is all over, it pushes all the fetched chats into the global list of chats
    using setChats() 
     */
    useEffect(() => {
      
        if (isError) {
          console.log(message)
        }
    
        dispatch(fetchChat())
        setChats(fetchChat())
        
        
        
    
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, isError, message, dispatch])

      if (isLoading){
        return <Loading/>
      }
   
  return (
    /* chattts is a redux state for the list of chats. Basically, for each chat in chattts, we create a card
     with info such as the sender's name, profile pic, and latest message sent. If there are no chats that the 
     user has started (ie chattts.length !== 0), we display that there are no chats that the user has started */
    <div className='bg-light'>



                {chattts.length > 0 ? (
                   
                 <div className='chatsss'>
                 
                    {chattts.map((chat)=> (
                       /* <SingleChat chat = {chat} /> */
                       <Card className='mychatscard' onClick={()=> setSelectedChat(chat)}>
                            <Card.Title as = 'div' className='CardTit text-dark'>
                              <div className='CardTitHd'>
                                <Image className='mychatim' src = {getSenderFull(user, chat.users).profilePic}/>
                                <h5>{getSender(user, chat.users)}</h5>

                                </div> 
                            
                            </Card.Title>
                        </Card>
                    
                    ))}

                    

                </div>
                   
                
             
                ) : (
                <h3>You have not set any chats</h3>
                )}
         
             
        
    </div>
  )
}

export default MyChats