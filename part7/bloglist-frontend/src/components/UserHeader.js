const UserHeader = ({ handleLogout, nameUser }) => (
  <div style={{ marginBottom: '16px' }}>
    <p style={{ display: 'inline' }}>Welcome back, {nameUser}</p>
    <button onClick={handleLogout} style={{ marginLeft: '4px' }}>
      Logout
    </button>
  </div>
)

export default UserHeader
