import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

import { expect } from 'vitest'


describe('<Blog />', () => {
  let container

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

  const getExtraInfo = container => container.querySelector('.blog > div[name="ExtraBlogInfo"]')


  beforeEach(() => {
    const addLike = () => {}
    const removeBlog = () => {}


    container = render(<Blog blog={blog} user={user} addLike={addLike} removeBlog={removeBlog}/>).container
  })

  test('at start renders content', () => {
    const blogTitleElement = container.querySelector('.blogTitleAuthor')

    expect(blogTitleElement).toHaveTextContent(blog.title)
    expect(blogTitleElement).toHaveTextContent(blog.author)
  })


  test('at start does not render extra info', () => {
    expect(getExtraInfo(container)).toHaveStyle('display: none')
  })

  test('renders extra info after click', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.blogTitleAuthor > button')

    console.log(button)

    await user.click(button)

    const extraInfo = getExtraInfo(container)

    //console.log(extraInfo)

    expect(extraInfo).not.toHaveStyle('display: none')
  })
})

