const Persons = ({persons, onDelete}) => {

  return (
    <div>
      {persons.map(person => 
        <div key={person.id}>
          <p style={{display: "inline"}}>{person.name} {person.number}</p>
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </div>)
      }
    </div>
  );
};

export default Persons;