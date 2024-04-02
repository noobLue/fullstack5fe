import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = (handleLogin, username, password, setUsername, setPassword) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input type='text' value = {username} name='Username' onChange={({target})=>{setUsername(target.value)}}></input>
        password <input type='password' value = {password} name='Password' onChange={({target})=>{setPassword(target.value)}}></input>
        <button type='submit'>login</button>
      </div>
    </form>
  )
}

const Blogs = (blogs) => {
  return (<div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>)
}


const UserBlog = (user, setUser, blogs) => {
  const logout = (input) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (<div>
    <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
    {Blogs(blogs)}
  </div>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')

      console.log(`Logged in as`, user)
    } catch(exception) {
      // TODO: error message
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? LoginForm(handleLogin, username, password, setUsername, setPassword) : UserBlog(user, setUser, blogs)}
    </div>
  )
}

export default App