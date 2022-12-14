const NumberList = ({ numbers_to_display, handle_delete_number }) => {
  return (
    <ul
      style={{listStyleType: 'none', fontSize: '20px'}}
    >
      {numbers_to_display.map(number => {
        return <li key={number.id} style={{margin: '5px'}}>
          [{number.id}] {number.name} {number.phone}
          <button
            style={{margin: '5px', backgroundColor: 'pink'}}
            onClick={() => handle_delete_number(number.id)}
          >
            Delete
          </button>
        </li>
      })}
    </ul>
  )
}

export default NumberList