import React, { useState } from 'react';

const PersonForm = ({ onSubmit }) => {
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const onNameChange = (event) => {
    setNewName(event.target.value);
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleAddPerson = (event) => {
    event.preventDefault();
    const isAdded = onSubmit(newName, newNumber)
    
    if(isAdded) {
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input
          placeholder="Add Name"
          value={newName}
          onChange={onNameChange} 
          required />
      </div>
      <div>number: <input
        placeholder="Add Phonenumber"
        value={newNumber}
        onChange={onNumberChange}
        required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;