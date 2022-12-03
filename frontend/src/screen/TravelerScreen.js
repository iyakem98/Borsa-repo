//this component renderes a list of travelers/buyers for users to view

import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import TravelerCard from '../components/Travelers/TravelerCard'
import { getTravelers, reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import './TravelerScreen.css'

const TravelerScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { travelers, isLoading, isError, message } = useSelector(
        (state) => state.auth
      )
    
    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        if (!user) {
          navigate('/login')
        }

        if (user.isTraveler) {
            navigate('/consumers')
        } 
    
        dispatch(getTravelers())
    
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, isError, message, dispatch])

      
  return (
    <div className='travelersc'>
        {isLoading?(<Loading/>): isError? (<h2>error</h2>): (
            <Container>
            <Row>
                {travelers.map((product) =>  (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <TravelerCard product = {product}/>
                    </Col>
                ))}
            </Row>
        </Container>
        )}
        
    </div>
  )
}

export default TravelerScreen