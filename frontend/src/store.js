import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice'
import goalReducer from './features/goals/goalSlice'
import messageReducer from './features/message/messageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    goals: goalReducer,
    mess: messageReducer
  },
})