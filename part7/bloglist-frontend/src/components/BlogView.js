import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateLikes, deleteBlog } from '../reducers/blogsReducer'

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
    dispatch(
      updateLikes(
        blog.id,
        { likes: blog.likes + 1 }
      )
    )
  }

  const handleRemove = async () => {
    if (
      window.confirm(
        `Remove blog "${blog.title}" by ${blog.author}?`
      )
    ) {
      const blogObject = {
        id: blog.id,
        title: blog.title,
        author: blog.author
      }
      dispatch(deleteBlog(blogObject))
      navigate('/')
    }
  }
  console.log(blog)

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <button onClick={handleLike}> Like</button><br />
      added by {blog.user.name}<br />
      <button onClick={handleRemove} style={showRemoveButton}>
        remove
      </button>
      <h4>comments</h4>
      {blog.comments.length === 0
        ? <p><i>no comment yet</i></p>
        : <ul>
          {blog.comments.map((comment, index) => (
            <li key={blog.id + index}>{comment}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default BlogView