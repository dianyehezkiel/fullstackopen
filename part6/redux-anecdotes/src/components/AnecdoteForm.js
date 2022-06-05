import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { removeNotif, showNotif } from "../reducers/notificationReducer"

let timeoutId

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotif(`You added "${content}"`))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm