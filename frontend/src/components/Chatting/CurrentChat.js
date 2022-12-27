/* This code deals with the currently opened chat and all messages within it.
*/

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
  
    //this is a property of the typing icon. No need to worry about this  
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      
   
    // This useEffect function basically ensures that socket is connected as soon as the page is loaded 
     useEffect(() =>  {
        socket = io(ENDPOINT);
        socket.emit("setup", user)
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
      
    }, [])
   
    // this function connects to the backend and fetches every message users in this chat have sent each other
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

    /*this useEffect function calls the function to fetch all messages in the chat. 
    The "selectedChat" in the brackets below ensures that fetchmessages() is called 
    whenever the slectedChat is changed so users can see the messages every chat they select.
    */
    useEffect(() =>  {
        fetchMessages() 
        console.log("hello people of the world")

        selectedChatCompare = selectedChat
      
    }, [selectedChat])


    /* 
    This deals with the user receiving a message. Using socketio makes the retrieval of message 
    instantaneous. Below, if the user has not opened the chat in which message was sent, they 
    get a notification that they have a new message. Else (if they have opened the specific chat)
    they get the message realtime. 
    */
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


    //the function below is redundant 
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('submitt')
    }

    
    
   
    
    /* This function deals with sending a message. It connects to the backend to send the
    chat in which the message is being sent (chatId) and the message itself (content). In the
    end, the new message is pushed into an array of all messages (using setMessages). There is
    a socket calling to stop typing as soon as the message is sent so that the typing notification
    dissapears
     */
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

    /* this handles the typing notification when the other user is typing in the chat.
    It utilizes timeouts to make sure that the tpying notification dissapears a few seconds
    after the user stops typing */
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
        //the code below renders the messages in a specific chat when it is selected including a typing box at the bottom
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
        //if a chat is not selected (!selectedChat), the box just displays the following text
        <h2 className='text-dark'>Click on a chat</h2>
        
       )}
    </div>
  )
}

export default CurrentChat