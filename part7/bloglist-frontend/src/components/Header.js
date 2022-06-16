import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = ({ handleLogout }) => {
  const username = useSelector(({ user }) => user.name)
  const headerStyle = {
    marginTop: '8px',
    marginBottom: '8px',
    backgroundColor: 'silver'
  }

  const mh = {
    marginRight: '4px',
    marginLeft: '4px'
  }

  return (
    <div style={headerStyle}>
      <Link style={mh} to={'/'}>blogs</Link>
      <Link style={mh} to={'/users'}>users </Link>
      <p style={{ display: 'inline' }}>Welcome back, {username}</p>
      <button onClick={handleLogout} style={{ marginLeft: '4px' }}>
        Logout
      </button>
    </div>
  )
}

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default Header
