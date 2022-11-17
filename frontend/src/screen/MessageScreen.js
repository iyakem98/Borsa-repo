import React from 'react'
import {login, logout, reset} from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { accessChat, getChat } from '../features/chat/chatSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer/FormContainer'
import './MessageScreen.css'

const MessageScreen = () => {
   const { user } = useSelector((state) => state.auth)
   const [id, setId] = useState('')
   
   
    const idd = "633b187f7c9c190b53d93ddc"

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          id,
        }
        console.log(userData)
    
        dispatch(accessChat(userData))
      }

    const clickMeh = (e) => {
        console.log(user._id)
        e.preventDefault()
    
        dispatch(accessChat(idd))
      }
  return (
    <div className='messagesc'>
        <FormContainer className='frmcontlogin'>
                <h1>Log in </h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='email' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            enter id 
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='id'
                            placeholder='Enter id'
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    
                    <Button type ='submit' variant = 'primary' className='btn btn-block btn-primary loginbutt'>
                        Log in 
                    </Button>
                </Form>
            </FormContainer>
        
    </div>
  )
}

export default MessageScreen