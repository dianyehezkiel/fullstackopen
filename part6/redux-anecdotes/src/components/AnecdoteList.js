import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotif, showNotif } from "../reducers/notificationReducer"

let timeoutId

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
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }
    
    const filteredAncdt = anecdotes.filter(a => a.content.includes(filter))
    return filteredAncdt.sort((a, b) => b.votes - a.votes)
  })
  

  const onVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotif(`You voted "${anecdote.content}"`))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => onVote(anecdote)} />
      )}
    </>
  )
}

export default AnecdoteList