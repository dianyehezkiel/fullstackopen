import { ListItemButton, Typography, Divider, ListItem } from '@mui/material'
import { Link } from 'react-router-dom'

const Blog = ({ id, title, author }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton component={Link} to={`/blogs/${id}`}>
          <Typography color="inherit" variant="body1">
            {title} <i>by</i> {author}
          </Typography>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default Blog
