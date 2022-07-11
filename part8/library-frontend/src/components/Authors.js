import BirthForm from "./BirthForm"

const Authors = (props) => {
  if (!props.show || props.loading) {
    return null
  }

  const authors = props.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <BirthForm />
    </div>
  )
}

export default Authors
