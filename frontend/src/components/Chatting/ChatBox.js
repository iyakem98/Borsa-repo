import React from 'react'
import ChatBoxHeader from './Misc/ChatBoxHeader'
import { ChatState } from '../../context/chatProvider';
import CurrentChat from './CurrentChat';



const ChatBox = () => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  return (
    <div>
        <CurrentChat/>
   
    </div>
  )
}

export default ChatBox