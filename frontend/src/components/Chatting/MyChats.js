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

    const { user } = useSelector((state) => state.auth)
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat)

    /*const fchh = (e) => {
        e.preventDefault()


        dispatch(fetchChat())
    }
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