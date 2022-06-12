import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const fetchAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdoteObject = { content, votes: 0}
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const voteAnecdote = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const anecdotesService = { fetchAll, createAnecdote, voteAnecdote }

export default anecdotesService