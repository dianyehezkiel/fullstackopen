import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      id: '1234567890',
      title: 'sample title',
      author: 'sample author',
      user: {
        name: 'sample user',
        username: 'sample',
        id: '0987654321'
      },
      url: 'example.com',
      likes: 12
    }

    container = render(<Blog blog={blog} />).container
  })

  test('renders content', () => {
    const blogHead = container.querySelector('.blog-head')
    const blogDetail = container.querySelector('.blog-detail')

    expect(blogHead).toHaveTextContent('sample title sample author')
    expect(blogDetail).toHaveStyle('display: none')

    const blogUrl = screen.queryByText('example.com')
    const blogLikes = screen.queryByText('likes 12')
    const blogCreator = screen.queryByText('sample user')

    expect(blogUrl).toBeNull()
    expect(blogLikes).toBeNull()
    expect(blogCreator).toBeNull()
  })

  test('blog detail showed if view button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogDetail = container.querySelector('.blog-detail')
    expect(blogDetail).not.toHaveStyle('display: none')

    const blogUrl = screen.queryByText('example.com')
    const blogLikes = screen.queryByText('likes 12')
    const blogCreator = screen.queryByText('sample user')

    expect(blogUrl).toBeDefined()
    expect(blogLikes).toBeDefined()
    expect(blogCreator).toBeDefined()
  })
})