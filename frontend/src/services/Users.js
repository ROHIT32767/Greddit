import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getID = () => {
  const loggedUserJSON = window.localStorage.getItem('token')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const request = axios.get(`${baseUrl}/${user.id}`)
    return request.then(response => response.data)
  }
  else {
    console.log("User is not logged in, but is trying to Fetch get request")
  }

}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const Delete = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}
const newobj = { getAll, getID, create, update, setToken, Delete }
export default newobj