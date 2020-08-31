import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const [blogInfo, setBlogInfo] = useState(
    {
      title: '',
      author: '',
      url: ''
    }
  )

  const handleTitleChange = (event) => {
    setBlogInfo({
      ...blogInfo,
      title: event.target.value
    })
  }

  const handleAuthorChange = (event) => {
    setBlogInfo({
      ...blogInfo,
      author: event.target.value
    })
  }

  const handleUrlChange = (event) => {
    setBlogInfo({
      ...blogInfo,
      url: event.target.value
    })
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: blogInfo.title,
      author: blogInfo.author,
      url: blogInfo.url
    })

    setBlogInfo({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div className="blogFormDiv">
      <h2 id="create-new">Create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
            title:
          <input
            id='title'
            autoComplete="true"
            type="text"
            value={blogInfo.title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
            author:
          <input
            id='author'
            autoComplete="true"
            type="text"
            value={blogInfo.author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
            url:
          <input
            id='url'
            autoComplete="true"
            type="text"
            value={blogInfo.url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" id='create-blog'>create</button>
      </form>
    </div>
  )}

export default BlogForm
