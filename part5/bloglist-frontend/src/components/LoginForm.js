import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin}) => (
  <form onSubmit={handleLogin}>
    <div>
      username 
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
        />
    </div>
    <div>
      password 
        <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
        />
    </div>
    <button type='submit'>Login</button>
  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm