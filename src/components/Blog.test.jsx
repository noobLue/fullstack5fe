import { render, screen } from '@testing-library/react'
import Blog from './Blog'

import { expect } from 'vitest'


test('renders content, does not render extra info', () => {

  //blog, user, addLike, removeBlog

  const user = {
    user: 'root',
    name: 'Root',
    id: 'userid1'
  }

  const blog = {
    id: '1',
    title: 'Winds Title',
    author: 'GG Author',
    url: 'https://myurl.net',
    likes: '777',
    user
  }

  const addLike = () => {}
  const removeBlog = () => {}

  const { container } = render(<Blog blog={blog} user={user} addLike={addLike} removeBlog={removeBlog}/>)

  const blogTitleElement = container.querySelector('.blogTitleAuthor')
  const blogExtraInfo = container.querySelector('.blog > div[name="ExtraBlogInfo"]')

  expect(blogTitleElement).toHaveTextContent(blog.title)
  expect(blogTitleElement).toHaveTextContent(blog.author)

  expect(blogExtraInfo).toHaveStyle('display: none')
})