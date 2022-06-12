import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const fetchAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const anecdotesService = { fetchAll }

export default anecdotesService