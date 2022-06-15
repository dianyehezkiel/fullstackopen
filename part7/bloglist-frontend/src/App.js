import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserHeader from './components/UserHeader'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { removeNotif, setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))
      dispatch(removeNotif())
    } catch (exception) {
      dispatch(setNotification('Incorrect Username or Password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
    dispatch(setNotification('Successfully logged out', 'success'))
  }

  return (
    <div>
      {user === null ? (
        <>
          <h2>Login to Application</h2>
          <Notification />
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <UserHeader handleLogout={handleLogout} />
          <Routes>
            <Route path='/' element={<Blogs />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
