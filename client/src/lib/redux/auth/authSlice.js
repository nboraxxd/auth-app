import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
