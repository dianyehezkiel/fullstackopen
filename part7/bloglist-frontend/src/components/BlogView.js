import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Link, Typography } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import PersonIcon from '@mui/icons-material/Person'
import { updateLikes, deleteBlog } from '../reducers/blogsReducer'
import Comments from './Comments'

const BlogView = ({ blog, username }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!blog) {
      navigate('/', { replace: true })
    }
  }, [blog])

  if (!blog) {
    return null
  }

  const showRemoveButton = {
    display: blog.user.username === username ? '' : 'none',
  }

  const handleLike = () => {
    dispatch(updateLikes(blog.id, { likes: blog.likes + 1 }))
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      const blogObject = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
      }
      dispatch(deleteBlog(blogObject))
      navigate('/')
    }
  }

  return (
    <Box>
      <Typography variant="h6" component="h3">
        {blog.title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LinkIcon sx={{ mr: '4px' }} color="primary" />
        <Link
          variant="body2"
          component="a"
          href={blog.url}
          underline="none"
          rel="noopener"
          target="_blank"
          noWrap={true}
        >
          {blog.url}
        </Link>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ThumbUpAltIcon sx={{ mr: '4px' }} color="primary" />
        <Typography mr="4px" variant="body2" component="p" noWrap={true}>
          {blog.likes} likes
        </Typography>
        <Button
          color="primary"
          component="button"
          variant="contained"
          onClick={handleLike}
          size="small"
        >
          Like
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PersonIcon sx={{ mr: '4px' }} color="primary" />
        <Typography variant="body2" component="p" noWrap={true}>
          added by {blog.user.name}
        </Typography>
      </Box>
      <Button
        sx={showRemoveButton}
        color="error"
        component="button"
        variant="contained"
        onClick={handleRemove}
        size="small"
      >
        Remove
      </Button>
      <Comments id={blog.id} comments={blog.comments} />
    </Box>
  )
}

export default BlogView
