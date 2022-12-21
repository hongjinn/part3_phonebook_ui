const api_base_url = "http://localhost:3001/numbers"

const get_all = () => {
  return fetch(`${api_base_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

const delete_number = (id) => {
  return fetch(`${api_base_url}/${id}`, {
    method: 'DELETE'
  })
}

const update_number = (id, modified_number) => {
  return fetch(`${api_base_url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(modified_number)
  })
}

const create_number = (number_to_add) => {
  console.log('bilbo')
  return fetch(api_base_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(number_to_add)
  })
}

export default {
    get_all,
    create_number,
    update_number,
    delete_number
}