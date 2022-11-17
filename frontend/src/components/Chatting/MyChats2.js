import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { fetchChat, reset } from '../../features/chat/chatSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading'
import SingleChat from './SingleChat'
import ChatProvider from '../../context/chatProvider'
import { ChatState } from '../../context/chatProvider'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { getSender } from './ChatConfig/ChatLogics'

const MyChats2 = () => {
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


const fetchChats = async () => {
  // console.log(user._id);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    setChats(data);
  } catch (error) {
   
  }
};
    useEffect(() => {
      
        if (isError) {
          console.log(message)
        }
    
       fetchChats()
        
       if (selectedChat) {
        console.log('lll')
       }
        
        
    
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, isError, message, dispatch])

      if (isLoading){
        return <Loading/>
      }

      const ee = (e) => {
        e.preventDefault()
        setSelectedChat('popopopo')
      }
   
  return (
    <div>



                {chats ? (
                   
                 <div className='chatsss'>
                 
                    {chats.map((chat)=> (
                        <Card onClick={()=> setSelectedChat(chat)}>
                            <Card.Title as = 'div' className='CardN'> 
                                <h3>{getSender(user, chat.users)}</h3>
                                {selectedChat? (<h5>{selectedChat._id}</h5>):(<h5>no</h5>)}
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

export default MyChats2