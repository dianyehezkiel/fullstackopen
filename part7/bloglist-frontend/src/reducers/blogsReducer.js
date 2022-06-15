import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blog = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, appendBlog } = blog.actions

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed to initiate blogs: ${exception.message}`,
          'error'
        )
      )
    }
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blogObject)
      dispatch(appendBlog(addedBlog))
      dispatch(
        setNotification(
          `Successfully added "${blogObject.title}" by ${blogObject.author}`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed to add blog: ${exception.message}`,
          'error'
        )
      )
    }
  }
}

export default blog.reducer