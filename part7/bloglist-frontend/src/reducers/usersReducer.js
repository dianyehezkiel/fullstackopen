import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const users = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

export const { setUsers } = users.actions

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch(setUsers(users))
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed to get users data: ${exception.message}`,
          'error'
        )
      )
    }
  }
}

export default users.reducer