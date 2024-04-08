import { useState } from 'react'


const FormValue = ({ label, name, value, setValue }) => {
  const onChangeHelper = (func) => {
    return ({ target }) => {func(target.value)}
  }

  return (<div>
    {label} <input type='text' name={name} value={value} onChange={onChangeHelper(setValue)}></input> <br/>
  </div>)
}

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (e) => {
    e.preventDefault()

    await createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form className='blogForm' onSubmit={handleBlog}>
      <FormValue key='title' label='title' value={title} name='BlogTitle' setValue={setTitle}></FormValue>
      <FormValue key='author' label='author' value={author} name='BlogAuthor' setValue={setAuthor}></FormValue>
      <FormValue key='url' label='url' value={url} name='BlogUrl' setValue={setUrl}></FormValue>
      <button type='submit'>submit</button>
    </form>
  )
}

export default BlogForm