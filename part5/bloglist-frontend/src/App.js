import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import UserHeader from './components/UserHeader'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [opsStatus, setOpsStatus] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotifMessage(null)
      setOpsStatus('')
    } catch (exception) {
      setOpsStatus('error')
      setNotifMessage('Incorrect username or Password')
      setTimeout(() => {
        setNotifMessage(null)
        setOpsStatus('')
      }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setOpsStatus('success')
      setNotifMessage('Successfully logged out')
      setTimeout(() => {
        setNotifMessage(null)
        setOpsStatus('')
      }, 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      setOpsStatus('success')
      setNotifMessage(`Successfully added "${title}" by ${author}`)
      setTimeout(() => {
        setNotifMessage(null)
        setOpsStatus('')
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      setOpsStatus('error')
      setNotifMessage(exception)
      setTimeout(() => {
        setNotifMessage(null)
        setOpsStatus('')
      }, 5000)
    }
  }

  return (
    <div>
      {user === null
      ? <>
        <h2>Login to Application</h2>
        <Notification type={opsStatus} message={notifMessage} />
        <LoginForm 
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin} />
        </>
      : <>
        <h2>blogs</h2>
        <Notification type={opsStatus} message={notifMessage} />
        <UserHeader nameUser={user.name} handleLogout={handleLogout} />
        <BlogForm
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          onSubmit={addBlog}
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      }
    </div>
  )
}

export default App
