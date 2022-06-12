import { createSlice } from "@reduxjs/toolkit"

let timeoutId

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

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(showNotif(message))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(removeNotif())
    }, time)
  }
}

export default notification.reducer