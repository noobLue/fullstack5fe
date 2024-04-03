import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

const Blogs = (blogs) => {
  return (<div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>)
}

const BlogForm = (postBlog, blogObjs) => {
  return (
    <form onSubmit={postBlog}>
      title <input type='text' value={blogObjs.blogTitle} name='BlogTitle' onChange={({target})=>{blogObjs.setBlogTitle(target.value)}}></input> <br/>
      author <input type='text' value={blogObjs.blogAuthor} name='BlogAuthor' onChange={({target})=>{blogObjs.setBlogAuthor(target.value)}}></input> <br/>
      url <input type='text' value={blogObjs.blogUrl} name='BlogUrl' onChange={({target})=>{blogObjs.setBlogUrl(target.value)}}></input> <br/>
      <button type='submit'>submit</button>
    </form>
    )
}


const UserBlog = (user, setUser, blogs, postBlog, blogObjs) => {
  const logout = (input) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (<div>
    <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
    <Toggleable startVisible={false} text={'Add blog'}>
      <h3>Create new blog</h3>
      {BlogForm(postBlog, blogObjs)}
    </Toggleable>
    <h3>Blogs list</h3>
    {Blogs(blogs)}
  </div>)
}

const App = () => {
  const [error, setError] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const blogObjs = {blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl}

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
      setError('Credentials were wrong')
      setTimeout(()=>{
        setError(null)
      }, 4000)
    }
  }

  const postBlog = async (e) => {
    e.preventDefault()

    try {
      const res = await blogService.postBlog({title: blogTitle, author: blogAuthor, url: blogUrl})

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')

      setBlogs(blogs.concat(res))
      
      setError(`Added a new blog '${res.title}' by '${res.author}'`)
      setTimeout(()=>{
        setError(null)
      }, 4000)


    } catch (exception)
    {
      setError('Failed to add new blog')
      setTimeout(()=>{
        setError(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {ErrorMessage(error)}
      {user === null ? LoginForm(handleLogin, username, password, setUsername, setPassword) : UserBlog(user, setUser, blogs, postBlog, blogObjs)}
    </div>
  )
}

export default App