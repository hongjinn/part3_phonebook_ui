import { useState, useEffect } from 'react'
import NumberList from './Components/NumberList.js'
import NewContact from './Components/NewContact.js'
import Message from './Components/Message.js'
import Search from './Components/Search.js'
import phonebookService from './services/phonebook.js'

const App = () => {

  const [numbers, set_numbers] = useState([])
  const [message, set_message] = useState('')
  const [new_name, set_new_name] = useState('')
  const [new_phone, set_new_phone] = useState('')
  const [search_term, set_search_term] = useState('')

  // Temporary code, delete later, id should be generated by server
  const get_max_id = () => {
    return Math.max(...numbers.map(number => number.id))
  }

  useEffect(() => {
    console.log("Getting numbers from server for the first time")
    phonebookService.get_all()
    .then(response => {
      if (response.ok === true) {
        console.log(`Successfully hit API`)
        return response.json()
      } else {
        throw new Error(`Bad response from server ${response.status}`)
      }
    })
    .then(data => {
      console.log(data)
      set_numbers(data)
    })
    .catch(error => console.log(error))
  }, [])
  

  const handle_new_number = (e) => {
    e.preventDefault()
    console.log(`User wants to add new number`)
    if (new_name.trim() === '' || new_phone.trim() === '') {
      alert(`Enter both a new name and number before submitting`)
      return false
    }

    const number_to_add = {
      "id": get_max_id() + 1,
      "name": new_name,
      "phone": new_phone
    }

    phonebookService.create_number(number_to_add)
    .then(response => {
      if (response.ok === true) {
        console.log(`Successfully added ${number_to_add.name} to server`)
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
      set_numbers(numbers.concat(data))
      set_new_name('')
      set_new_phone('')
  
      set_message(`SUCCESS: Added ${number_to_add.name}`)
      setTimeout(() => {
        set_message('')
      }, 1000)
    })
    .catch(error => console.log(error))

  }


  const handle_delete_number = (number_to_delete) => {
    console.log(`User wants to delete id: ${number_to_delete.id}`)

    phonebookService.delete_number(number_to_delete.id)
    .then(response => {
      if (response.ok === true) {
        set_numbers(numbers.filter(number => number.id !== number_to_delete.id))
        set_message(`SUCCESS: Deleted ${number_to_delete.name}`)
        setTimeout(() => {
          set_message('')
        }, 1000)
      } else {
        set_message('WARNING: Issue with the server')
        setTimeout(() => {
          set_message('')
        }, 1000)
        throw new Error(`Something went wrong with POST request ${response.status}`)        
      }
    })
    .catch(error => console.log(error))

  }
  
  const numbers_to_display = numbers.filter(number => {
    return number.name.toLowerCase().includes(search_term.toLowerCase())
  })

  return (
    <div
      style={{margin: '10px'}}
    >
      <h1>Phonebook</h1>

      <Message
        message={message}
      />

      Search
      <Search
        search_term={search_term}
        set_search_term={set_search_term}
      />

      <h2>Add a new contact</h2>
      <NewContact 
        handle_new_number={handle_new_number}
        new_name={new_name}
        set_new_name={set_new_name}
        new_phone={new_phone}
        set_new_phone={set_new_phone}
      />

      <h2>Numbers</h2>
      <NumberList
        numbers_to_display={numbers_to_display}
        handle_delete_number={handle_delete_number}
        set_numbers={set_numbers}
        numbers={numbers}
        set_message={set_message}
      />

      <hr />
      <small>A Full Stack Open exercise</small>

    </div>
  )
}

export default App;
