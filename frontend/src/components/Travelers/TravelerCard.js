
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

const TravelerCard = ({product}) => {

    const [text, setText] = useState('this is my text')
    const {chats, isLoading, isError, message, selectedChat} = useSelector((state) => state.chat)


    const { sellectedChat, setSellectedChat, chatts, setChatts } = ChatState();


    const metry = "this is metry"
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clicmetry = (e) => {
        e.preventDefault()
    
        dispatch(tryChat(metry))
      }
    
    
  const [userId, setUserId] = useState(product._id)

 

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(product._id)

    dispatch(accessChat({ userId }))
    setSellectedChat(chats)
    console.log(chats)
    console.log('aaa')
    console.log(sellectedChat)
    console.log('bbb')
    setText('')
  }

   
    return (
      
        <Card onClick={(onSubmit)} className='my-3 p-1 myCard'>
            <Card.Img src={product.profilePic} className='cardImg'/>

                <Card.Body>
                    <Card.Title as = 'div' className='text-dark'> 
                        <h3>{product.firstName} {product.lastName}</h3>
                    </Card.Title>
                    <Card.Text as = 'div' className='text-dark'>
                        <h7>{product.city}, {product.country}</h7>
                    </Card.Text>
                    
                </Card.Body>
        </Card>
    )
}

export default TravelerCard
