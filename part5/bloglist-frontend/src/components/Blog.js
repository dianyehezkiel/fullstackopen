import { useState } from "react"

const Blog = ({blog, updateLikes}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const viewButtonLabel = visible ? 'hide' : 'view'

  const updateBlogLikes = () => {
    updateLikes({likes: blog.likes + 1}, blog.id)
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
      </div>
    </div>
  ) 
}

export default Blog