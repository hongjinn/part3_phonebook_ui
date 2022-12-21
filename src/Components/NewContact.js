const NewContact = ({ handle_new_number, new_name, set_new_name, new_phone, set_new_phone }) => {
  return (
    <form
      onSubmit={handle_new_number}
      style={{border: 'solid 1px green', margin: '5px', padding: '5px', width:'350px'}}
    >

      <div>
        Name
        <input
          style={{margin: '5px', width:'252px'}}
          value={new_name}
          onChange={(e) => set_new_name(e.target.value)}
        />
      </div>

      <div>
        Phone
        <input
          style={{margin: '5px', width:'250px'}}
          value={new_phone}
          onChange={(e) => set_new_phone(e.target.value)}
        />
      </div>

      <button
        style={{backgroundColor: 'cyan'}}
      >
        Submit
      </button>
    </form>

  )
}

export default NewContact