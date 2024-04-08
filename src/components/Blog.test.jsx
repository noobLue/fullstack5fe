import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockAddLikes

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
    mockAddLikes = vi.fn()
    const removeBlog = () => {}

    container = render(<Blog blog={blog} user={user} addLike={mockAddLikes} removeBlog={removeBlog}/>).container
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

    await user.click(button)

    expect(getExtraInfo(container)).not.toHaveStyle('display: none')
  })

  test('like button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.blogLikes > button')

    expect(mockAddLikes.mock.calls).toHaveLength(0)

    await user.click(button)
    await user.click(button)

    expect(mockAddLikes.mock.calls).toHaveLength(2)
  })
})

