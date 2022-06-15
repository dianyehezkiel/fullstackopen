import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import UserHeader from './components/UserHeader'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { removeNotif, setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  initBlogs,
  addBlog,
  updateLikes,
  deleteBlog,
} from './reducers/blogsReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(removeNotif())
    } catch (exception) {
      dispatch(setNotification('Incorrect Username or Password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    dispatch(setNotification('Successfully logged out', 'success'))
  }

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject))
  }

  const handleLike = (id, likes) => {
    dispatch(updateLikes(id, likes))
  }

  const handleDelete = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog "${blogObject.title}" by ${blogObject.author}?`
      )
    ) {
      dispatch(deleteBlog(blogObject))
    }
  }

  return (
    <div>
      {user === null ? (
        <>
          <h2>Login to Application</h2>
          <Notification />
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <UserHeader nameUser={user.name} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreate} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={handleLike}
              deleteBlog={handleDelete}
              owner={user.username}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
