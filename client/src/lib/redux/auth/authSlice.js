import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
    },
  },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
