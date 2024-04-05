import { useState, useEffect } from 'react'


const removeButton = (handleRemoveBlog) => {
  return (<button onClick={handleRemoveBlog}>delete</button>)
}

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('show')

  useEffect(() => {
    setButtonText(visible ? 'hide' : 'show')
  },[visible])

  const handleVisibility = async (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const handleLike = async (e) => {
    e.preventDefault()

    await addLike({ ...blog, user: blog.user.id, likes: blog.likes + 1 })
  }

  const handleRemoveBlog = async (e) => {
    e.preventDefault()

    if(window.confirm(`Do you want to remove blog '${blog.title}' by '${blog.author}'`))
    {
      await removeBlog({ ...blog, user: blog.user.id })
    }
  }

  return (
    <div style={{ margin: '7px', padding: '4px', border: 'solid', borderWidth: '1px' }}>
      {blog.title} - {blog.author} <button onClick={handleVisibility}>{buttonText}</button>
      <div name='ExtraBlogInfo' style={{ display: visible ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>uploaded by: {blog.user.name}</div>
        {blog.user.user === user.username && removeButton(handleRemoveBlog)}
      </div>
    </div>
  )
}

export default Blog