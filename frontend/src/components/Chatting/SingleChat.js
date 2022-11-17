import React from 'react'
import { getSender } from './ChatConfig/ChatLogics'
import { useSelector } from 'react-redux'
import { ChatState } from '../../context/chatProvider'
import { Card } from 'react-bootstrap'

const SingleChat = ({chat}) => {

    const { user } = useSelector((state) => state.auth)
    
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const ss = (e) => {
      e.preventDefault()

      setSelectedChat('taur')
    } 

    
  return (
   /* <div onClick={setSelectedChat('lol')}>
        <h3>{getSender(user, chat.users)}</h3>
        <h4>{chat._id}</h4>
  
        
    </div> */

    <Card onClick={ss} className='my-1 p-2 rounded myCard'>
            <a href='#'/>
            <h1>{selectedChat}</h1>
           

                <Card.Body>
                    <Card.Title as = 'div' className='CardN'> 
                        <h3>{getSender(user, chat.users)}</h3>
                    </Card.Title>
                    <Card.Text as = 'div' className='text-dark'>
                        <h7>{chat._id}</h7>
                    </Card.Text>
                    
                </Card.Body>
        </Card>
  )
}

export default SingleChat