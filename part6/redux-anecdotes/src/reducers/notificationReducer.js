import { createSlice } from "@reduxjs/toolkit"

const notification = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotif(state, action) {
      return action.payload
    },
    removeNotif(state, action) {
      return ''
    }
  }
})

export const { showNotif, removeNotif } = notification.actions
export default notification.reducer