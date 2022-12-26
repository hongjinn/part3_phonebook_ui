import { useState } from 'react'
import phonebookService from '../services/phonebook.js'

const PersonList = ({ persons_to_display, handle_delete_person, persons, set_persons, set_message }) => {
  return (
    <ul
      style={{listStyleType: 'none', fontSize: '20px'}}
    >
      {persons_to_display.map(person => {
        return <Person
          key={person.id}
          person={person}
          handle_delete_person={handle_delete_person}
          set_persons={set_persons}
          persons={persons}
          set_message={set_message}
        />
      })}
    </ul>
  )
}

const Person = ({ person, handle_delete_person, persons, set_persons, set_message }) => {

  const [ modify_mode, set_modify_mode ] = useState(false)
  const [ modify_name, set_modify_name ] = useState('')
  const [ modify_number, set_modify_number ] = useState('')

  const show_modify_person = (person_to_modify) => {
    console.log(`User opens modify form for id: ${person_to_modify.id} name: ${person_to_modify.name}`)
    set_modify_mode(!modify_mode)
  
    // Fill out form
    set_modify_name(person_to_modify.name)
    set_modify_number(person_to_modify.number)
  }

  const handle_modify_person = (person_to_modify) => (e) => {
    e.preventDefault()
    console.log(`User want to submit modification for id: ${person_to_modify.id}`)
    if (modify_name.trim() === '' || modify_number.trim() === '') {
      alert(`Enter both a new name and person before submitting`)
      return false
    }

    const modified_person = {
      "id": person_to_modify.id,
      "name": modify_name,
      "number": modify_number
    }

    phonebookService.update_person(modified_person.id, modified_person)
    .then(response => {
      if (response.ok === true) {
        console.log(`Successfully added ${modified_person.name} to server`)
        return response.json()
      } else {
        set_message('WARNING: Issue with the server')
        setTimeout(() => {
          set_message('')
        }, 1000)
        throw new Error(`Something went wrong with POST request ${response.status}`)
      }
    })      
    .then(data => {
      console.log(data)
      set_persons(persons.map(person => person.id === person_to_modify.id ? modified_person : person))

      set_message(`SUCCESS: Modified ${modified_person.name}`)
      setTimeout(() => {
        set_message('')
      }, 1000)
  
      set_modify_name('')
      set_modify_number('')
      set_modify_mode(false)
    })
    .catch(error => console.log(error))
    


  }

  return (
    <li key={person.id} style={{margin: '5px'}}>
      [{person.id}] {person.name} <span style={{fontWeight: 'bold', color: 'green'}}>@</span> {person.number}
      <button
        style={{margin: '5px', backgroundColor: 'pink'}}
        onClick={() => handle_delete_person(person)}
      >
        Delete
      </button>

      <button
        style={{backgroundColor: 'orange'}}
        onClick={() => show_modify_person(person)}
      >
        {
          modify_mode
          ? 'Cancel modify'
          : 'Modify'
        }
      </button>

      {
        modify_mode
        ? <ModifyContact
          handle_modify_person={handle_modify_person}
          person_to_modify={person}
          modify_name={modify_name}
          set_modify_name={set_modify_name}
          modify_number={modify_number}
          set_modify_number={set_modify_number}
          set_modify_mode={set_modify_mode}
        />
        : ''
      }
    </li>
  )
}

const ModifyContact = ({ 
  handle_modify_person,
  person_to_modify,
  modify_name,
  set_modify_name,
  modify_number,
  set_modify_number,
  set_modify_mode
}) => {
  return (
    <form
      onSubmit={(e) => handle_modify_person(person_to_modify)(e)}
      style={{border: 'solid 1px green', margin: '5px 5px 25px 10px', padding: '5px 5px 5px 15px', width:'350px'}}
    >

      <div>
        Name
        <input
          style={{margin: '5px', width:'252px'}}
          value={modify_name}
          onChange={(e) => set_modify_name(e.target.value)}
        />
      </div>

      <div>
        Phone
        <input
          style={{margin: '5px', width:'250px'}}
          value={modify_number}
          onChange={(e) => set_modify_number(e.target.value)}
        />
      </div>

      <button
        style={{margin: '5px', backgroundColor: 'cyan'}}
        type="submit"
      >
        Submit
      </button>
      <button 
        type="button"
        onClick={() => set_modify_mode(false)}
        style={{backgroundColor: 'orange'}}
      >
        Cancel Modify
      </button>

    </form>
  )
}

export default PersonList