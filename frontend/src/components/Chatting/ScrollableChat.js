import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import { isSameSender, isLastMessage, isSameSenderMargin, isSameUser } from './ChatConfig/ChatLogics'
import './LeChat.css'
const ScrollableChat = ({messages}) => {

    const { user } = useSelector((state) => state.auth)

  return (
    <ScrollableFeed>
        {messages &&  
         messages.map((m, i) => (
            <div style={{display: "flex"}} key = {m._id}>
                {(isSameSender(messages, m, i, user._id)
                ||
                isLastMessage(messages, i, user._id)
            ) && (
                <Image className='senderim' src={m.sender.profilePic}/>
            ) }
            <span style={{
                backgroundColor: `${
                    m.sender._id === user._id ? "#593196" : "#E8E8E8"
                }`,
                color: `${
                    m.sender._id === user._id ? "white" : "black"
                }`,
                borderRadius : "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m , i, user._id),
                marginTop: isSameUser(messages, m , i , user._id)? 3: 10,
            }}>
                {m.content}
            </span>
            </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat