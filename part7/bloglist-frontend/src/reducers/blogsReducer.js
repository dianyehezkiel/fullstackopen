import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogs = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((b) => (b.id !== action.payload.id ? b : action.payload))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogs.actions

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed to get blogs data: ${exception.message}`,
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
        setNotification(`Failed to add blog: ${exception.message}`, 'error')
      )
    }
  }
}

export const updateLikes = (id, likes) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(likes, id)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(
        setNotification(`Failed to update likes: ${exception.message}`, 'error')
      )
    }
  }
}

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogObject.id)
      dispatch(removeBlog(blogObject.id))
      dispatch(
        setNotification(
          `Successfully remove "${blogObject.title}" by ${blogObject.author}`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(`Failed to remove blog: ${exception.message}`, 'error')
      )
    }
  }
}

export default blogs.reducer
