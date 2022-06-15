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
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    fetchData()
  }, [])

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

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog).sort((a, b) => b.likes - a.likes))
      dispatch(
        setNotification(
          `Successfully added "${addedBlog.title}" by ${addedBlog.author}`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(setNotification(exception, 'error'))
    }
  }

  const updateLikes = async (likes, id) => {
    try {
      const updatedBlog = await blogService.update(likes, id)
      setBlogs(
        blogs
          .map((blog) => (blog.id === id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (exception) {
      dispatch(setNotification(exception, 'error'))
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Remove blog "${blogObject.title}" by ${blogObject.author}?`
        )
      ) {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        dispatch(
          setNotification(
            `Successfully remove "${blogObject.title}" by ${blogObject.author}`,
            'success'
          )
        )
      }
    } catch (exception) {
      dispatch(setNotification(exception, 'error'))
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
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              owner={user.username}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
