import React from 'react'
import { ChatState } from '../../context/chatProvider'
import animationData from '../../data/Animations/typing-indicator1.json'
import { getSenderFull } from './ChatConfig/ChatLogics';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import FormContainer from '../FormContainer/FormContainer'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { sendMessage } from '../../features/message/messageSlice';
import './LeChat.css'
import axios from 'axios';
import Loading from '../Loading';
import ScrollableChat from './ScrollableChat';
import Lottie from 'react-lottie'; 
import io from 'socket.io-client'


const ENDPOINT = "http://localhost:5002";
var socket, selectedChatCompare 

const CurrentChat = () => {




    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const {isLoading, isError} = useSelector((state) => state.mess)
    const { user } = useSelector((state) => state.auth)
    const [socketConnected, setSocketConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()
    const [ld, setLd] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
  
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
   

    useEffect(() =>  {
        socket = io(ENDPOINT);
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
      
    }, [])
   
    
    const fetchMessages = async () =>  {
        if (!selectedChat){
            return
        }

        try {

            const config = {
            headers: {
               /* "Content-type": "application/json", */
                Authorization: `Bearer ${user.token}`,
            },
            };

            setLd(true)
            const { data } = await axios.get(
            `/api/message/${selectedChat._id}`,
            config

           
            
         );
         
         setMessages(data);

         setLd(false)

        socket.emit('join chat', selectedChat._id)

       
            
        } catch (error) {
            throw new Error(error)
        }
    }


    useEffect(() =>  {
        fetchMessages() 
        console.log("hello people of the world")

        selectedChatCompare = selectedChat
      
    }, [selectedChat])
    
    useEffect(()=> {
        socket.on('message received', (newMessageReceived) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                //give notification
            }

            else {
                setMessages([...messages, newMessageReceived])
            }
        })
    })

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('submitt')
    }

    
    
   
    

    const sendMess = async(event) => {
        event.preventDefault()
        console.log(newMessage)
        console.log(selectedChat._id)
        if (newMessage) {
            socket.emit('stop typing', selectedChat._id)
            try {

                const config = {
                headers: {
                   /* "Content-type": "application/json", */
                    Authorization: `Bearer ${user.token}`,
                },
                };
                setNewMessage("");
                const { data } = await axios.post(
                "/api/message",
                {
                    content: newMessage,
                    chatId: selectedChat._id,
                
                },
                config
             );

            socket.emit('new message', data)
            setMessages([...messages, data]);
                
            } catch (error) {
                throw new Error(error)
            }
        }
    }

    const typingHandler = (e) => {
       setNewMessage(e.target.value)
        
       if(!socketConnected) return

       if(!typing) {
        setTyping(true)
        socket.emit('typing', selectedChat._id);
       }

       let lastTypingTime = new Date().getTime()
       var timerLength = 3000
       setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;

        if(timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id)
            setTyping(false)
        }
       }, timerLength);
    }
    
  return (
    <div className='currchat'>
       {selectedChat? (

        <div className='currchatbox'>

            <div className='currchatmainbox'>
               {/* <h1>{getSenderFull(user, selectedChat.users).firstName}</h1> */}

               <ScrollableChat messages={messages}/>
              
            </div>

         
            <div className='messageform'>

            <FormContainer className='frmcontmessage'>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='newMessage' className='frmgrp'>
                        {isTyping? (
                            <div>
                              <Lottie
                                options = {defaultOptions}
                                width = {70}
                                style = {{marginBottom: 15, marginLeft: 0}}
                                />      
                            </div>
                            ) : (
                            <></>
                            )}
                        <Form.Control 
                            className='frmcontmessage'
                            type='newMessage'
                            placeholder='Type here'
                            value={newMessage}
                            onChange={typingHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                </Form>
            </FormContainer>

            <Button onClick={sendMess} className='messageformbutt'>Send </Button>
                
            </div>
          
         </div>

      
       ):(
        <h2 className='text-dark'>Click on a chat</h2>
        
       )}
    </div>
  )
}

export default CurrentChat