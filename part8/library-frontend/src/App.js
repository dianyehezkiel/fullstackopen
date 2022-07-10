import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const { data: aData, loading: aLoading } = useQuery(ALL_AUTHORS, {
    skip: page !== 'authors'
  })
  const { data: bData, loading: bLoading } = useQuery(ALL_BOOKS, {
    skip: page !== 'books'
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} data={aData} loading={aLoading} />

      <Books show={page === 'books'} data={bData} loading={bLoading} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
