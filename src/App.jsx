import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'


const ErrorMessage = (error) => {
  if(!error) return (<div></div>)

  return (
  <div style={{background:'lightgray', border: '2px', borderStyle: 'solid', borderColor: 'gray', fontSize: '20px', padding: '10px', margin: '5px'}}>
    {error}
  </div>)
}

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

const Blogs = (blogs, addLike) => {
  return (<div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike}/>
      )}
  </div>)
}


const UserBlog = (user, setUser, blogs, createBlog, addLike) => {
  const logout = (input) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (<div>
    <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
    <Toggleable startVisible={false} text={'Add blog'}>
      <h3>Create new blog</h3>
      <BlogForm createBlog={createBlog}/>
    </Toggleable>
    <h3>Blogs list</h3>
    {Blogs(blogs, addLike)}
  </div>)
}

const App = () => {
  const [error, setError] = useState(null)

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

      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleMessage = async (message) => {
    // TODO: save timeout so multiple timeouts at the same time can be prevented? 
    setError(message)
    setTimeout(()=>{
      setError(null)
    }, 4000)
  }

  const createBlog = async (blog) => {
    try {
      const res = await blogService.postBlog(blog)
      setBlogs(blogs.concat(res))
      
      handleMessage(`Added a new blog '${res.title}' by '${res.author}'`)
    } catch (exception)
    {
      handleMessage('Failed to add new blog')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      handleMessage('Credentials were wrong')
    }
  }

  const addLike = async (blog) => {
    try {
      const res = await blogService.putBlog(blog)

      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      
    } catch (exception)
    {
      handleMessage('Failed to add like')
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {ErrorMessage(error)}
      {user === null ? LoginForm(handleLogin, username, password, setUsername, setPassword) : UserBlog(user, setUser, blogs, createBlog, addLike)}
    </div>
  )
}

export default App