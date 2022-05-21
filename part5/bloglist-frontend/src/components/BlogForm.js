const BlogForm = (props) => (
  <>
    <h3>create new</h3>
    <form onSubmit={props.onSubmit} style={{marginBottom: "16px"}}>
      title:
      <input
      value={props.title}
      onChange={props.handleTitleChange}
      required
      />
      <br/>
      author:
      <input
      value={props.author}
      onChange={props.handleAuthorChange}
      />
      <br/>
      url:
      <input
      value={props.url}
      onChange={props.handleUrlChange}
      required
      />
      <br/>
      <button type="submit">create</button>
    </form>
  </>
)

export default BlogForm