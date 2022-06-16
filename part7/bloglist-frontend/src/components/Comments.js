import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const Comments = ({ id, comments }) => {
  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(id, { comment: newComment }))
  }

  return (
    <>
      <h4>comments</h4>
      <form onSubmit={handleComment}>
        <input
          name="inputComment"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {comments.length === 0
        ? <p><i>no comment yet</i></p>
        : <ul>
          {comments.map((comment, index) => (
            <li key={id + index}>{comment}</li>
          ))}
        </ul>
      }
    </>
  )
}

export default Comments