import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import {
  addBlog,
  updateLikes,
  deleteBlog
} from '../reducers/blogsReducer'
import { initBlogs } from '../reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes)
  )
  const username = useSelector(({ user }) => user.username)

  const blogFormRef = useRef()

  const handleCreate = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject))
  }

  const handleLike = (id, likes) => {
    dispatch(updateLikes(id, likes))
  }

  const handleDelete = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog "${blogObject.title}" by ${blogObject.author}?`
      )
    ) {
      dispatch(deleteBlog(blogObject))
    }
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={handleLike}
          deleteBlog={handleDelete}
          username={username}
        />
      ))}
    </div>
  )
}

export default Blogs