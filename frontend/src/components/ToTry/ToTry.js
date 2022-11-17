
import React from 'react'
import './ToTry.css'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { accessChat, getChat, tryChat } from '../../features/chat/chatSlice'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
const ToTry = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [text, setText] = useState('this is metry bro')

    const clickkk = (e) => {
        e.preventDefault()
    
        dispatch(tryChat({text}))
    }

  return (
    <div className='tot'>
        <Button onClick={clickkk}>Click meh</Button>
    </div>
  )
}

export default ToTry