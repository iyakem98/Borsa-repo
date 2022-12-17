/* This is a card styling each traveler's card in the list of travelers. It includes traveler info such as profile pic, name, and travel date/location */
import React from 'react'
import { Card, Carousel } from 'react-bootstrap'
import './TravelerCard.css'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {login, logout, reset} from '../../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { accessChat, getChat, tryChat } from '../../features/chat/chatSlice'
import { useState, useEffect } from 'react'
import ChatProvider from '../../context/chatProvider'
import { ChatState } from '../../context/chatProvider'

const TravelerCard = ({traveler}) => {

    const [text, setText] = useState('this is my text')
    //const {chats, isLoading, isError, message, selectedChat} = useSelector((state) => state.chat)

    const {chattts, isLoading, isError, message} = useSelector((state) => state.chat) // gets chat states from redux

    const { selectedChat, setSelectedChat, chats, setChats } = ChatState(); // gets global chat states from context api
    //const { sellectedChat, setSellectedChat, chatts, setChatts } = ChatState();


    const metry = "this is metry"
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clicmetry = (e) => {
        e.preventDefault()
    
        dispatch(tryChat(metry))
      }
    
    
  const [userId, setUserId] = useState(traveler._id)

 
//this function connects to the backend via redux using dispatch and starts a chat with the selected individual (card)
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(traveler._id)

    dispatch(accessChat({ userId }))
    setSelectedChat(chattts[0])
    console.log(chattts[0])
    console.log('aaa')
    console.log(selectedChat)
    console.log('bbb')
    setText('')
  }

   
    return (

        
        <Card onClick={(onSubmit)} className='my-3 p-1 myCard'>
            <Link to= '/chat' onClick={onSubmit}>
                <Card.Img src={traveler.profilePic} className='cardImg'/>
            </Link>
           
            <Link to= '/chat' style={{ textDecoration: 'none' }}>

                <Card.Body>
                    <Card.Title as = 'div' className='text-dark'> 
                        <h3>{traveler.firstName} {traveler.lastName}</h3>
                    </Card.Title>
                    <Card.Text as = 'div' className='text-dark'>
                        <h7>{traveler.city}, {traveler.country}</h7>
                    </Card.Text>
                    
                </Card.Body>
                </Link>
        </Card>

      
        
    )
}

export default TravelerCard
