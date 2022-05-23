import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders content', () => {
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

    const { container } = render(<Blog blog={blog} />)

    const blogHead = container.querySelector('.blog-head')
    const blogDetail = container.querySelector('.blog-detail')

    expect(blogHead).toHaveTextContent('sample title sample author')
    expect(blogDetail).toHaveStyle('display: none')
  })
})