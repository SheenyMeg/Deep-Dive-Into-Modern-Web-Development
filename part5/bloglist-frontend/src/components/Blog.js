import React, { useState } from 'react'

const Blog = ({ blog, handleRemove, handleAddLikes }) => {
  const [showDetail, setShowDetail] = useState(false)

  const handleShow =  () => {
    setShowDetail(!showDetail)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeStyle = {
    display: 'flex',
    flexDirection: 'row',
  }
  const likeButton = {
    marginLeft: 10
  }
  const showMore = { display: showDetail ? '' : 'none' }

  return (
    <div style={ blogStyle } className='blog'>
      <div>
        <b>Title:</b> {blog.title}
        {
          showDetail?
            <button id='hide' onClick={handleShow}>hide</button> :
            <button id='view' className='view-button' onClick={handleShow}>view</button>
        }
      </div>
      <div style={ showMore } className='testBlog'>
        <div> <b>Author:</b> {blog.author}  </div>
        <div className='testUrl'> <b>Url:</b> {blog.url}  </div>
        <div style={ likeStyle }>
          <div className='testLike'><b>Likes:</b> {blog.likes}</div>
          <button id='like' onClick={ () => handleAddLikes(blog.id) } style={ likeButton }>like</button>
        </div>
        <button id='remove' onClick={ () => handleRemove(blog.id) }>remove</button>
      </div>
    </div>
  )

}

export default Blog
