import { useSelector, useDispatch } from "react-redux"
import { actionVote } from "../reducers/anecdoteReducer"

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
  const anecdotes = useSelector(({ anecdotes }) => 
    anecdotes.sort((a, b) => b.votes - a.votes))

  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(actionVote(anecdote.id))} />
      )}
    </>
  )
}

export default AnecdoteList