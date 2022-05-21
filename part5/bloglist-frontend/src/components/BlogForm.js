const BlogForm = (props) => (
  <>
    <h3>create new</h3>
    <form onSubmit={props.onSubmit} style={{marginBottom: "16px"}}>
      title:
      <input
      value={props.title}
      onChange={({ target }) => props.setTitle(target.value)}
      required
      />
      <br/>
      author:
      <input
      value={props.author}
      onChange={({ target }) => props.setAuthor(target.value)}
      />
      <br/>
      url:
      <input
      value={props.url}
      onChange={({ target }) => props.setUrl(target.value)}
      required
      />
      <br/>
      <button type="submit">create</button>
    </form>
  </>
)

export default BlogForm