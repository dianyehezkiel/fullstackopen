import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/users', { replace: true })
    }
  }, [user])

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      {user.blogs.length !== 0 ? (
        <>
          <b>added blogs</b>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <b>no blog added yet</b>
      )}
    </div>
  )
}

export default User
