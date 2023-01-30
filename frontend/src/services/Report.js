import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/Reports'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data).catch(error => console.log(error))
}

const getID = (id) => {
  const loggedUserJSON = window.localStorage.getItem('token')
  if (loggedUserJSON) {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data).catch(error => console.log(error))
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

const Ignore = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/ignore/${id}`, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const Delete = (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data).catch(error => console.log(error))
}




const newobj = { getAll, getID, create, Ignore, setToken, Delete }
export default newobj