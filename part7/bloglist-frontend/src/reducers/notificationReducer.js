import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const initialState = {
  message: null,
  type: null,
}

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotif(state, action) {
      return action.payload
    },
    removeNotif() {
      return initialState
    },
  },
})

export const { createNotif, removeNotif } = notification.actions

export const setNotification = (message, type) => {
  const notifObject = { message, type }
  return async (dispatch) => {
    dispatch(createNotif(notifObject))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }
}

export default notification.reducer
