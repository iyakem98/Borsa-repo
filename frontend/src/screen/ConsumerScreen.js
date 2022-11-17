import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import TravelerCard from '../components/Travelers/TravelerCard'
import { getConsumers, reset, getTravelers} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { accessChat } from '../features/chat/chatSlice'
import './TravelerScreen.css'

const ConsumerScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { consumers, isLoading, isError, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        if (!user) {
          navigate('/login')
        }

        if (!user.isTraveler) {
            navigate('/travelers')
        } 
    
        dispatch(getConsumers())
    
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, isError, message, dispatch])
      
    
  return (
     <div className='travelersc'>
        {isLoading?(<Loading/>): isError? (<h2>error</h2>): (
            <Container>
                <Row>
                    {consumers.map((product) =>  (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <TravelerCard /*key={product._id}*/ product = {product}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        )}
      
    </div>
  )
}

export default ConsumerScreen