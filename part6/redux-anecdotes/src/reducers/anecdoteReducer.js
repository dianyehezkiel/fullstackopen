import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const anecdote = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdote.actions

export const initAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.fetchAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const ancdtState = getState().anecdotes
    const anecdote = ancdtState.find(a => a.id === id)
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdotesService.voteAnecdote(id, votedAnecdote)
    const updatedState = ancdtState.map(a => a.id !== id ? a : votedAnecdote)
    dispatch(setAnecdotes(updatedState))
  }
}

export default anecdote.reducer