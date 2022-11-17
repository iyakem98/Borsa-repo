import React from 'react'
import './LoginScreen.css'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }
    
        dispatch(login(userData))
      }
  return (
    <div className='login'>
        <div className='loginleft bg-secondary'>

        </div>

        <div className='loginright'>
            <FormContainer className='frmcontlogin'>
                <h1>Log in </h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId='email' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Email Address
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='email'
                            placeholder='Enter username or email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Password
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Link to = '/register' style={{ }} className='text-primary'>I don't have an account</Link>
                    <Button type ='submit' variant = 'primary' className='btn btn-block btn-primary loginbutt'>
                        Log in 
                    </Button>
                </Form>
            </FormContainer>
        
        </div>
    </div>
  )
}

export default LoginScreen