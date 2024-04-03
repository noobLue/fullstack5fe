import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const postBlog = async (blog) => {
  const res = await axios.post(baseUrl, blog, { headers: { Authorization: token } })
  return res.data
}

const putBlog = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, { headers: { Authorization: token } })
  return res.data
}

export default { getAll, postBlog, putBlog, setToken }