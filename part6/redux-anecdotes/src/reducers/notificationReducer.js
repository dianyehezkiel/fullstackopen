import { createSlice } from "@reduxjs/toolkit"

const notification = createSlice({
  name: 'notifications',
  initialState: 'This is the notification',
  reducers: {
    show(state, action) {
      return action.payload
    }
  }
})

export const { show } = notification.actions
export default notification.reducer