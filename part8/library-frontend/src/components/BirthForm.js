import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries"

const BirthForm = ({ authors }) => {
  const [name, setName] = useState('none')
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

    setName('none')
    setBorn('')
  }

  return(
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option key="none" value="none" disabled hidden>Select author name</option>
            {authors.map((a) => (
              <option
                key={a.name}
                value={a.name}
              >
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">Born</label>
          <input
            type="number"
            name="born"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <input type="submit" value="update author"/>
      </form>
    </div>
  )
}

export default BirthForm