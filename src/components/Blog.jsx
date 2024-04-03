import { useState, useEffect} from 'react'

const Blog = ({ blog }) => {
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

    console.log('not implemented yet')
  }

  return (
  <div style={{margin: '7px', padding: '4px', border: 'solid', borderWidth: '1px'}}>
    {blog.title} - {blog.author} <button onClick={handleVisibility}>{buttonText}</button>
    <div name='ExtraBlogInfo' style={{display: visible ? '' : 'none'}}>
      <div>{blog.url}</div>
      <div>likes: {blog.likes} <button onClick={handleLike}>like</button></div>
      <div>uploaded by: {blog.user.name}</div>
    </div>
  </div>
  )
}

export default Blog