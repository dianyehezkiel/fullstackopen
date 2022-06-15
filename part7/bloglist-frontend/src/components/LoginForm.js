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
    <form onSubmit={onSubmit} id="login-form">
      <div>
        username
        <input
          id="username-input"
          type="text"
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-input"
          type="password"
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
