import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes }) =>
    [...anecdotes].sort((a, b) => b.votes - a.votes))

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))} />
      )}
    </>
  )
}

export default AnecdoteList