import axios from 'axios'

const API_URL = '/api/chat/'
const accessChat = async(userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`

        }
    }

    console.log(userId)

    const response = axios.post(API_URL, userId, config)

    console.log(response)
    

    return response.data 
}

const tryChat = async(chatData, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`

      }
  }
  console.log(chatData)
  const response = axios.post(API_URL + 'try', chatData, config)
  
  console.log(response)
  

  return response.data 
}

const fetchChat = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    
    console.log('fetchin in chatService')
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

const chatService = {
    accessChat,
    fetchChat,
    tryChat
}
export default chatService