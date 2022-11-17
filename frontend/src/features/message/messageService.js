import axios from 'axios'

const API_URL = '/api/message/'
const sendMessage = async(content, chatId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`

        }
    }

    /*content = content
    chatId = chatId

    console.log(chatId)
    console.log(content) */


    const response = axios.post(API_URL, content, chatId, config)

    console.log(response)
    

    return response.data 
}


const allMessages = async (chatId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    
    console.log('fetchin in messageService')
    const response = await axios.get(API_URL + chatId , config)
  
    return response.data
  }

const messageService = {
    sendMessage,
    allMessages
}


export default messageService