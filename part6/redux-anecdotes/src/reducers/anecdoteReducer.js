import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const anecdote = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      return state.map(a => a.id !== id ? a : votedAnecdote)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdote.actions

export const initAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.fetchAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdote.reducer