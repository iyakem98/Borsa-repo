import React, { useState } from 'react'
import './ContactForm.css'
import FormContainer from '../FormContainer/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ContactForm = () => {

    const onSubmit = () => {
        console.log('Contact Submitted')
    }

    const { user } = useSelector((state) => state.auth)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [myMess, setMyMess] = useState('')
  return (
    <div className='cntfrm'>
        <div className='bg-light cntfrmhd'>
            <h1 className='text-secondary'>Contact Us</h1>
        </div>
        <div className='cntfrmsc'>
        <FormContainer className='frmcontlogin'>
                <Form onSubmit={onSubmit}>
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
                    
                    <Form.Group controlId='myMess' className='frmgrp'>
                        <Form.Label className='frmlog text-dark'>
                            Message 
                        </Form.Label>
                        <Form.Control 
                            as = 'textarea'
                            rows = {5}
                            className='frmcontrol'
                            type='message'
                            placeholder='Enter message here'
                            value={myMess}
                            onChange={(e) => setMyMess(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>If you have any file (eg: picture) relavant to your message, please attach it here</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Button type ='submit' variant = 'primary' className='btn btn-block btn-primary cntbutt'>
                        Submit
                    </Button>
                </Form>
            </FormContainer>
        </div>
         
    </div>
  )
}

export default ContactForm