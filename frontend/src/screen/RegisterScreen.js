import React from 'react'
import { useState, useEffect } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'



const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isTraveler, setIsTraveler] = useState(false)
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [profilePic, setProfilPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [mess, setMess] = useState(null);
    const [mess2, setMess2] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(mess)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, mess, navigate, dispatch])

      const postDetails = (profilePic) => {
        

         
      }

      const handleCheck = () => {
         setIsTraveler(!isTraveler)
      }

      const onSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMess("Passwords do not match")
        }

        else {
             const userData = {
                firstName,
                lastName,
                userName,
                email,
                password,
                city,
                country,
                isTraveler,
              }
          
              dispatch(register(userData))

        }
       
      }

  return (
    <div className='signup'>
        <div className='loginleft bg-secondary'>

        </div>

        <div className='loginright'>
            <FormContainer className='frmcontlogin'>
                <h1>Sign up </h1>
                {mess && <Message variant='danger'>{mess}</Message>}
                {mess2 && <Message variant='danger'>{mess2}</Message>}
                <Form  onSubmit={onSubmit}>
                <Row className='frmcontrol'>
                <Col>
                    <Form.Group controlId='firstname' className='frmgrp'>
                    <Form.Label className='text-dark'>
                        First Name
                    </Form.Label>
                    <Form.Control
                        type='firstName'
                        placeholder='Enter your first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='lastname' className='frmgrp'>
                    <Form.Label className='text-dark'>
                        Last Name
                    </Form.Label>
                    <Form.Control
                        type='lastName'
                        placeholder='Enter your last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    >
                    </Form.Control>
              </Form.Group>
                </Col>
            </Row>
                    <Form.Group controlId='userName' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Username
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='userName'
                            placeholder='Enter desired username'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Email Address
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='password' className='frmgrp'>
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

                    <Form.Group controlId='confirmPassword' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            City
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='city'
                            placeholder='Enter your city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='country' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Country
                        </Form.Label>
                        <Form.Control
                            className='frmcontrol'
                            type='country'
                            placeholder='Enter your country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Add a profile picture</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            value={isTraveler}
                            label="I am a traveler"
                            onChange={handleCheck}
                        />
                    </Form.Group>
                    <Link to = '/login' style={{ }} className='text-primary'>Already have an account?</Link>
                    <Button type ='submit' variant = 'primary' className='btn btn-block btn-primary loginbutt'>
                        Sign up
                    </Button>
                </Form>
            </FormContainer>
        
        </div>
    </div>
  )
}

export default RegisterScreen