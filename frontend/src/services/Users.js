import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data).catch(error => console.log(error))
}

const getID = () => {
  const loggedUserJSON = window.localStorage.getItem('token')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const request = axios.get(`${baseUrl}/${user.id}`)
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
  // ! Create uses await while other use then,catch
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const UpdateProfile = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/update/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const UpdateFollowers = (id ,newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request  = axios.put(`${baseUrl}/followers/${id}`,newObject,config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const UpdateFollowing = (id ,newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request  = axios.put(`${baseUrl}/following/${id}`,newObject,config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const Delete = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data).catch(error => console.log(error))
}
const newobj = { getAll, getID, create, UpdateProfile, setToken, Delete , UpdateFollowers , UpdateFollowing }
export default newobj