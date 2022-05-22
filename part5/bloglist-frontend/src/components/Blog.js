import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, owner }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButton = { display: blog.user.username === owner ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const viewButtonLabel = visible ? 'hide' : 'view'

  const updateBlogLikes = () => {
    updateLikes({ likes: blog.likes + 1 }, blog.id)
  }

  const removeBlog = () => {
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{viewButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={updateBlogLikes}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button onClick={removeBlog} style={showRemoveButton}>remove</button>
      </div>
    </div>
  )
}

export default Blog