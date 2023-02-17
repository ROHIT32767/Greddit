import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/Chat'

let token = null
if(window.localStorage.getItem('token'))
{
  token = `bearer ${JSON.parse(window.localStorage.getItem('token')).token}`
}
const setToken = newToken => {
    token = `bearer ${JSON.parse(window.localStorage.getItem('token')).token}`
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }, 
    }
    // ! Create uses await while other use then,catch
    const response = await axios.post(baseUrl, newObject, config)
    return response.data 
}

const getbyRoom = (id) => {
    const config = {
        headers: { Authorization: token },
      }
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
        const request = axios.get(`${baseUrl}/${id}`,config)
        return request.then(response => response.data).catch(error => console.log(error))
    }
    else {
        console.log("User is not logged in, but is trying to Fetch get request")
    }
}

const updateRoom = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data).catch(error => console.log(error))
}

const newobj = { create , getbyRoom , updateRoom }
export default newobj