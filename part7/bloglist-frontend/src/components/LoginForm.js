import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
  }

  return (
    <Box component={Paper} sx={{ p: '16px', maxWidth: '300px' }}>
      <Typography component="h1" variant="h5" align="center">
        Login to Blog App
      </Typography>
      <form onSubmit={onSubmit} id="login-form">
        <TextField
          sx={{
            my: '4px',
          }}
          id="username-input"
          label="Username"
          variant="outlined"
          fullWidth={true}
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        {/* <div>
          username
          <input
            id="username-input"
            type="text"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div> */}
        <TextField
          sx={{
            my: '4px',
          }}
          id="password-input"
          label="Password"
          variant="outlined"
          fullWidth={true}
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {/* <div>
          password
          <input
            id="password-input"
            type="password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */}
        <Button
          sx={{
            my: '4px',
          }}
          variant="contained"
          type="submit"
          fullWidth={true}
        >
          Login
        </Button>
        {/* <button id="login-button" type="submit">
          Login
        </button> */}
      </form>
    </Box>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
