import { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { removeNotif, setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import { Container, AppBar, Stack, Box, Grid } from '@mui/material'

const App = () => {
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

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

  const usersMatch = useMatch('/users/:id')
  const selectedUser = usersMatch
    ? users.find((u) => u.id === usersMatch.params.id)
    : null

  const blogsMatch = useMatch('/blogs/:id')
  const selectedBlog = blogsMatch
    ? blogs.find((b) => b.id === blogsMatch.params.id)
    : null

  return (
    <Box>
      {user === null ? (
        <Box>
          <Notification />
          <Grid
            sx={{
              height: '90vh',
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <LoginForm handleLogin={handleLogin} />
          </Grid>
        </Box>
      ) : (
        <Stack spacing={8}>
          <AppBar>
            <Container disableGutters>
              <Header handleLogout={handleLogout} />
            </Container>
          </AppBar>
          <Box>
            <Container>
              <Notification />
              <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/users/:id"
                  element={<User user={selectedUser} />}
                />
                <Route
                  path="/blogs/:id"
                  element={
                    <BlogView blog={selectedBlog} username={user.username} />
                  }
                />
              </Routes>
            </Container>
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default App
