import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import feedbackService from './feedbackService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const traveler = JSON.parse(localStorage.getItem('traveler'))

const initialState = {
  user: user ? user : null,
  traveler: traveler ? traveler : null, 
  rating: 0, 
  comment: '', 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''

}


// Collect Feedback
export const collectFeedback = createAsyncThunk(
  'feedback/collect',
  async (feedbackData, thunkAPI) => {
    try {
      return await feedbackService.sendFeedback(feedbackData)
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



export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(collectFeedback.pending, (state) => {
        state.isLoading = true
      })
      .addCase(collectFeedback.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(collectFeedback.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = feedbackSlice.actions
export default feedbackSlice.reducer