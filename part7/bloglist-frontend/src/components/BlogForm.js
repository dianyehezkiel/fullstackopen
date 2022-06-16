import { useState } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Typography, TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <Typography
        sx={{
          mb: '8px',
        }}
        variant="button"
        component="h3"
      >
        Create New
      </Typography>
      <FormGroup id="blog-form" sx={{ width: { xs: '100%', md: '50%' } }}>
        <TextField
          id="title-input"
          label="Title"
          variant="standard"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          id="author-input"
          label="Author"
          variant="standard"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          id="url-input"
          label="URL"
          variant="standard"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button
          sx={{ mt: '8px' }}
          id="create-button"
          variant="contained"
          onClick={addBlog}
        >
          Create
        </Button>
      </FormGroup>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
