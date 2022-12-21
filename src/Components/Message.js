const Message = ({ message }) => {

  const css_message = {
    margin: '0px 0px 15px 5px',
    padding: '10px',
    width: '400px',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold'
  }

  const css_success = {
    ...css_message,
    border: '4px solid green',
    backgroundColor: 'lightgreen',
    color: 'darkgreen'
  }

  const css_warn = {
    ...css_message,
    border: '4px solid red',
    backgroundColor: 'pink',
    color: 'darkred'
  }

  if (message.slice(0,4) === 'SUCC') {
    return (
      <div
        style={css_success}
      >
        {message}
      </div>
    )
  } else if (message.slice(0,4) === 'WARN') {
    return (
      <div
        style={css_warn}
      >
        {message}
      </div>      
    )
  }

  return (
    <></>
  )
}

export default Message