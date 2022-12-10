import axios from 'axios'
const API_URL = '/api/users/feedback'

// Register user
const sendFeedback = async (data) => {
  const response = await axios.post(API_URL, data)
  return response.data
}


const feedbackService = {
  sendFeedback
}

export default feedbackService