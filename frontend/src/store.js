import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice'
import messageReducer from './features/message/messageSlice'
import feedbackReducer from './features/feedback/feedbackSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    mess: messageReducer,
    feed: feedbackReducer
  },
})