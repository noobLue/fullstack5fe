import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  let mockCreateBlog

  const blog = {
    title: 'Winds of Spring',
    author: 'GGRRG',
    url: 'https://myurl.net'
  }

  beforeEach(() => {
    mockCreateBlog = vi.fn()

    container = render(<BlogForm createBlog={mockCreateBlog}/>).container
  })

  test('createBlog is called with right values', async () => {
    const user = userEvent.setup()
    const blogForm = container.querySelector('.blogForm')

    const blogFormName = blogForm.querySelector('input[name="BlogTitle"]')
    const blogFormAuthor = blogForm.querySelector('input[name="BlogAuthor"]')
    const blogFormUrl = blogForm.querySelector('input[name="BlogUrl"]')
    const blogFormButton = blogForm.querySelector('button[type="submit"]')

    await user.type(blogFormName, blog.title)
    await user.type(blogFormAuthor, blog.author)
    await user.type(blogFormUrl, blog.url)

    expect(mockCreateBlog.mock.calls).toHaveLength(0)

    await user.click(blogFormButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)

    expect(mockCreateBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(mockCreateBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(mockCreateBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})

