import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('form calls createBlog handler with right details', async () => {
    const newBlog = {
      title: 'sample title',
      author: 'sample author',
      url: 'example.com'
    }

    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('Title...')
    const inputAuthor = screen.getByPlaceholderText('Author...')
    const inputUrl = screen.getByPlaceholderText('Url...')
    const createButton = screen.getByText('create')

    await user.type(inputTitle, newBlog.title)
    await user.type(inputAuthor, newBlog.author)
    await user.type(inputUrl, newBlog.url)
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
  })
})