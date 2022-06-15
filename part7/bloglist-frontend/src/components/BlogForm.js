import { useState } from 'react'
import PropTypes from 'prop-types'

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
      <h3>create new</h3>
      <form onSubmit={addBlog} id="blog-form">
        title:
        <input
          id="title-input"
          placeholder="Title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        <br />
        author:
        <input
          id="author-input"
          placeholder="Author..."
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input
          id="url-input"
          placeholder="Url..."
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
        />
        <br />
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
