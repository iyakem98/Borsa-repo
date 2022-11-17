import React from 'react'
import { ChatState } from '../../context/chatProvider'
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
import {io} from 'socket.io-client'

const CurrentChat = () => {

    const ENDPOINT = "http://localhost:5002";
    var socket, selectedChatCompare;



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const {isLoading, isError} = useSelector((state) => state.mess)
    const { user } = useSelector((state) => state.auth)

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()
    const [ld, setLd] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)

    const [sm, setSm] = useState('abcd')

    useEffect(() => {
        console.log('rendering useEffect')
        console.log(socketConnected)
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        setSocketConnected(true)
        console.log(socketConnected)
    
        
      }, []);

    /*useEffect(() =>  {
        socket = io(ENDPOINT);
        socket.emit("setup", user)
        socket.on("connection", () => setSocketConnected(true))
    }, []) */

    useEffect(()=> {
        if (!socketConnected){
            console.log('notttttt')
        }
        socket = io(ENDPOINT);
        socket.emit("setup", user)
        //socket.on("connection", () => setSocketConnected(true))
        socket.on('message received', (newMessageReceived) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                //notify
            }
            else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    })



    const onSend = (e) => {
        e.preventDefault()
        dispatch(sendMessage([newMessage, selectedChat._id]))
        setNewMessage("")
        
       
      }

    
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
         
         //socket.to(selectedChat._id).emit('join chat');

         setMessages(data);
         //console.log(messages)
         setLd(false)

         socket = io(ENDPOINT)
         socket.emit("join_room", selectedChat._id)

         console.log(selectedChat._id)

         //this.socket.emit("join_room", selectedChat._id)

       
            
        } catch (error) {
            throw new Error(error)
        }
    }


    useEffect(() =>  {
        fetchMessages() 
        console.log("hello people of the world")

        selectedChatCompare = selectedChat
    }, [selectedChat])
    


    const onSubmit = (e) => {
        e.preventDefault()
        console.log('submitt')
    }

    
    

    const sendMess = async(event) => {
        event.preventDefault()
        console.log(newMessage)
        console.log(selectedChat._id)
        if (newMessage) {
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

             socket = io(ENDPOINT )
             
            socket.emit ("new_message", data)
            setMessages([...messages, data]);
                
            } catch (error) {
                throw new Error(error)
            }
        }
    }

    const typingHandler = (e) => {
       setNewMessage(e.target.value)

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
        <h2>Click on a chat</h2>
        
       )}
    </div>
  )
}

export default CurrentChat