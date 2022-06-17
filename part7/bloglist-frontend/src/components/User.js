import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
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
    <Box>
      <Typography component="h3" variant="h6">
        {user.name}
      </Typography>
      {user.blogs.length !== 0 ? (
        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              mt: '16px',
            }}
            component="p"
            variant="body1"
          >
            Added blogs
          </Typography>
          <List>
            {user.blogs.map((blog, index) => (
              <ListItem key={blog.id}>
                <ListItemText>{`${index + 1}. ${blog.title}`}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography component="i" variant="body2">
          No blog added yet
        </Typography>
      )}
    </Box>
  )
}

export default User
