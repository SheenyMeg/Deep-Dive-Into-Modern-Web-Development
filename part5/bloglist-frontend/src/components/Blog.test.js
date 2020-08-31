import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog.js'

describe('<Blog />', () => {
  let component
  let mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'author test',
      url: 'http'
    }

    component = render(
      <Blog blog={blog} handleAddLikes={mockHandler}></Blog>
    )
  })

  test('renders content', () => {
    // const li = component.container.querySelector('li')

    // console.log(prettyDOM(li))

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    const element = component.getByText(
      'author test'
    )
    expect(element).toBeDefined()

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })
  test('click button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const showBlog = component.container.querySelector('.testBlog')
    expect(showBlog).not.toHaveStyle('display: none')

    const url = component.container.querySelector('.testUrl')
    expect(url).toHaveTextContent('http')

    const likes = component.container.querySelector('.testLike')
    expect(likes).toBeDefined()
  })

  test('click twice like button, event handler will dispatch twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
