import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/SubGreddiits'

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

const UpdateProfile = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/update/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const BlockUser = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/block/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const AcceptRequest = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/accept/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const RejectRequest = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/reject/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const JoinSubGreddit = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/join/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const LeaveSubGreddit = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/leave/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => console.log(error))
}


const Delete = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data).catch(error => console.log(error))
}

const newobj = { getAll, getID, create, UpdateProfile, setToken, Delete , BlockUser , JoinSubGreddit , LeaveSubGreddit , AcceptRequest , RejectRequest}
export default newobj