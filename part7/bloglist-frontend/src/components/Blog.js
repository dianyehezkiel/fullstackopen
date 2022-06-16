import { Link } from 'react-router-dom'

const Blog = ({ id, title, author }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <Link
        className="blog-head"
        to={`/blogs/${id}`}>
        {title} {author}
      </Link>
    </div>
  )
}

export default Blog
