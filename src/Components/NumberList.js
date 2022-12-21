import { useState } from 'react'

const NumberList = ({ numbers_to_display, handle_delete_number, numbers, set_numbers }) => {
  return (
    <ul
      style={{listStyleType: 'none', fontSize: '20px'}}
    >
      {numbers_to_display.map(number => {
        return <Number
          key={number.id}
          number={number}
          handle_delete_number={handle_delete_number}
          set_numbers={set_numbers}
          numbers={numbers}
        />
      })}
    </ul>
  )
}

const Number = ({ number, handle_delete_number, numbers, set_numbers }) => {

  const [ modify_mode, set_modify_mode ] = useState(false)
  const [ modify_name, set_modify_name ] = useState('')
  const [ modify_phone, set_modify_phone ] = useState('')

  const show_modify_number = (number_to_modify) => {
    console.log(`User opens modify form for id: ${number_to_modify.id} name: ${number_to_modify.name}`)
    set_modify_mode(!modify_mode)
  
    // Fill out form
    set_modify_name(number_to_modify.name)
    set_modify_phone(number_to_modify.phone)
  }

  const handle_modify_number = (number_to_modify) => (e) => {
    e.preventDefault()
    console.log(`User want to submit modification for id: ${number_to_modify.id}`)
    if (modify_name.trim() === '' || modify_phone.trim() === '') {
      alert(`Enter both a new name and number before submitting`)
      return false
    }

    const modified_number = {
      "id": number_to_modify.id,
      "name": modify_name,
      "phone": modify_phone
    }

    set_numbers(numbers.map(number => number.id === number_to_modify.id ? modified_number : number))

    set_modify_name('')
    set_modify_phone('')
    set_modify_mode(false)

  }

  return (
    <li key={number.id} style={{margin: '5px'}}>
      [{number.id}] {number.name} <span style={{fontWeight: 'bold', color: 'green'}}>@</span> {number.phone}
      <button
        style={{margin: '5px', backgroundColor: 'pink'}}
        onClick={() => handle_delete_number(number.id)}
      >
        Delete
      </button>

      <button
        style={{backgroundColor: 'orange'}}
        onClick={() => show_modify_number(number)}
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
          handle_modify_number={handle_modify_number}
          number_to_modify={number}
          modify_name={modify_name}
          set_modify_name={set_modify_name}
          modify_phone={modify_phone}
          set_modify_phone={set_modify_phone}
        />
        : ''
      }
    </li>
  )
}

const ModifyContact = ({ handle_modify_number, number_to_modify, modify_name, set_modify_name, modify_phone, set_modify_phone }) => {
  return (
    <form
      onSubmit={(e) => handle_modify_number(number_to_modify)(e)}
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
          value={modify_phone}
          onChange={(e) => set_modify_phone(e.target.value)}
        />
      </div>

      <button>Submit</button>

    </form>
  )
}

export default NumberList