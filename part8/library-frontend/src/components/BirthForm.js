import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries"

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const setBornTo = parseInt(born)
    editBirthYear({ variables: {name, setBornTo} })

    setName('')
    setBorn('')
  }

  return(
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="born">Born</label>
          <input
            type="number"
            name="born"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <input type="submit" value="update author"/>
      </form>
    </div>
  )
}

export default BirthForm