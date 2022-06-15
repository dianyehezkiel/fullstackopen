import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const UserHeader = ({ handleLogout }) => {
  const username = useSelector(({ user }) => user.name)

  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ display: 'inline' }}>Welcome back, {username}</p>
      <button onClick={handleLogout} style={{ marginLeft: '4px' }}>
        Logout
      </button>
    </div>
  )
}

UserHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default UserHeader
