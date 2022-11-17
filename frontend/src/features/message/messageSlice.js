import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from './messageService'

const initialState = {
    messages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    messages: [],
  }



  export const sendMessage = createAsyncThunk(
    'message/send',
    async (content, thunkAPI) => {
      console.log(`startin slice on ${content}`)
  
      try {
        const token = thunkAPI.getState().auth.user.token
        return await messageService.sendMessage(content, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


  export const allMessages = createAsyncThunk(
    'message/get',
    async (chatId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        console.log('fetching in messageSlice')
        return await messageService.allMessages(chatId, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const messageSlice = createSlice({
    name: 'mess',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(sendMessage.pending, (state) => {
          state.isLoading = true
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.messages.push(action.payload)
        })
        .addCase(sendMessage.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(allMessages.pending, (state) => {
          state.isLoading = true
        })
        .addCase(allMessages.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.messages = action.payload
        })
        .addCase(allMessages.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })
  
  export const { reset } = messageSlice.actions
  export default messageSlice.reducer
