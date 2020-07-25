import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (nameObj) => {
  const request = axios.post(baseUrl, nameObj)
  return request.then(response => response.data)
}

const clear = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const replace = (id,changeObj) => {
  const request = axios.put(`${baseUrl}/${id}`, changeObj)
  return request.then(response => response.data)
}
export default { getAll, create, clear, replace }