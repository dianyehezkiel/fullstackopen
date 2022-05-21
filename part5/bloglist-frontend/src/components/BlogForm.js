import { useState } from 'react'

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
    <form onSubmit={addBlog}>
      title:
      <input
      value={title}
      onChange={({ target }) => setTitle(target.value)}
      required
      />
      <br/>
      author:
      <input
      value={author}
      onChange={({ target }) => setAuthor(target.value)}
      />
      <br/>
      url:
      <input
      value={url}
      onChange={({ target }) => setUrl(target.value)}
      required
      />
      <br/>
      <button type="submit">create</button>
    </form>
  </>
  )
}

export default BlogForm