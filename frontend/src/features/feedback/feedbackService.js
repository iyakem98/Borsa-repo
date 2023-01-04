import axios from 'axios'
const API_URL = '/api/feedback/'

// Register user
const sendFeedback = async (data) => {
  const response = await axios.post(API_URL + "send", data)
  return response.data
}


const feedbackService = {
  sendFeedback
}

export default feedbackService