import axios from 'axios'
const baseUrl = '/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const update = async (id, updateObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.put(`${ baseUrl }/${id}`, updateObject, config)
  return request.data
}

export default { getAll, token, setToken, create, remove, update }