const api_base_url = "/api/persons"

const get_all = () => {
  return fetch(`${api_base_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

const delete_person = (id) => {
  return fetch(`${api_base_url}/${id}`, {
    method: 'DELETE'
  })
}

const update_person = (id, modified_person) => {
  return fetch(`${api_base_url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(modified_person)
  })
}

const create_person = (person_to_add) => {
  return fetch(api_base_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(person_to_add)
  })
}

export default {
    get_all,
    create_person,
    update_person,
    delete_person
}