import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ filteredPersons, setFilteredPersons ] = useState(null);
  const [ notifType, setNotifType ] = useState('');
  const [ notifMessage, setNotifMessage ] = useState(null);

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const filterChange = (filter) => {
    const fp = filter
      ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
      : null;
        
    setFilteredPersons(fp)
  };

  const addPerson = (newName, newNumber) => {
    const personExist = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase();
    });

    if (personExist) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const updatedPerson = { ...personExist, number: newNumber }

        personServices
          .update(personExist.id, updatedPerson)
          .then(returnedPerson => {
            setNotifType('success');
            setNotifMessage(`${newName}'s information has been successfully changed`);
            setTimeout(() => {
              setNotifType('')
              setNotifMessage(null)
            }, 5000);
            setPersons(persons.map(person => person.id !== personExist.id ? person : returnedPerson))
          })

        return 1;
      } else {
        return;
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setNotifType('success');
          setNotifMessage(`Added ${newName}`);
          setTimeout(() => {
            setNotifType('')
            setNotifMessage(null)
          }, 5000);
          setPersons(persons.concat(returnedPerson));
        });

      return 1;
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => {
      return person.id === id;
    });

    if(window.confirm(`Do you really want to delete ${person.name}?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          setNotifType('success');
          setNotifMessage(`${person.name}'s information has been deleted`);
        })
        .catch(error => {
          setNotifType('error');
          setNotifMessage(`Information of ${person.name} has already been removed from server`);
        })
        
      setTimeout(() => {
        setNotifType('')
        setNotifMessage(null)
      }, 5000)
      setPersons(persons.filter((person) => person.id !== id));
    } else {
      return;
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notifType} message={notifMessage} />
      <Filter onChange={filterChange} />
      <h3>Add a New Contact</h3>
      <PersonForm onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons? filteredPersons : persons} onDelete={handleDelete}/>
    </div>
  );
};

export default App;