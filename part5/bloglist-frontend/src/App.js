import React, { useState, useEffect, useRef  } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Blog from './components/Blog'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const [users, setUsers] = useState([])

  const [loginUser, setLoginUser] = useState(null)
  const [sortBlogs, setSortBlog] = useState([])

  const [name, setName] = useState('')
  const [notify, setMessage] = useState(
    {
      status: '',
      message: '',
      show: false
    }
  )

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers( users )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      setLoginUser(loginUser)
      blogService.setToken(loginUser.token)
    }

    const loggedSortBlogJSON = window.localStorage.getItem('loggedSortBlogs')
    if (loggedSortBlogJSON) {
      const sortBlog = JSON.parse(loggedSortBlogJSON)

      if (sortBlog.length > 0) {
        const sortLikes = (a,b) => {
          return a.likes < b.likes ? 1 : -1
        }
        const sort = sortBlog.sort(sortLikes)

        setSortBlog(sort)

        window.localStorage.setItem('loggedSortBlogs', JSON.stringify(sort))

      } else {
        window.localStorage.setItem('loggedSortBlogs', JSON.stringify([]))
      }
    }

    const loggedNameJSON = window.localStorage.getItem('loggedName')
    if (loggedNameJSON) {
      const nameStr = JSON.parse(loggedNameJSON)
      setName(nameStr)
    }
  }, [])

  const loginSubmit = async (loginObject) => {
    try {
      const loginedUser = await loginService.login(loginObject)
      if (loginedUser) {

        setLoginUser(loginedUser)
        setName(loginedUser.username)
        blogService.setToken(loginedUser.token)

        window.localStorage.setItem(
          'loggedName', JSON.stringify(loginedUser.username)
        )
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(loginedUser)
        )
        const userBlog = users.find(user => user.username === loginedUser.username ).blogs

        if (userBlog.length > 0) {
          const sortLikes = (a,b) => {
            return a.likes < b.likes ? 1 : -1
          }
          const sort = userBlog.sort(sortLikes)
          setSortBlog(sort)

          window.localStorage.setItem(
            'loggedSortBlogs', JSON.stringify(sort)
          )
        } else {
          window.localStorage.setItem(
            'loggedSortBlogs', JSON.stringify([])
          )
        }

        if (loginUser) {
          loginFormRef.current.toggleVisibility()
        }
      }
    } catch(e) {
      setMessage({
        status: 'fail',
        message: 'Wrong username or password',
        show: true
      })
      setTimeout(() => {
        setMessage({
          status: '',
          message: '',
          show: false
        })
      }, 5000)
    }
  }

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure to log out?')
    if (isLogout) {
      window.localStorage.clear()
      window.location.reload(false)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      if (newBlog) {
        setSortBlog( sortBlogs.concat(newBlog) )

        blogFormRef.current.toggleVisibility()

        const loggedBlogJSONArr = await window.localStorage.getItem('loggedSortBlogs')
        if (loggedBlogJSONArr) {
          const userBlog = JSON.parse(loggedBlogJSONArr)
          const newUserBlog = userBlog.concat(newBlog)
          window.localStorage.setItem('loggedSortBlogs', JSON.stringify(newUserBlog))
        }

        setMessage({
          status: 'success',
          message: `A new blog ${blogObject.title} created by ${loginUser.username}`,
          show: true
        })
        setTimeout(() => {
          setMessage({
            status: '',
            message: '',
            show: false
          })
        }, 5000)
      }
    } catch (e) {
      setMessage({
        status: 'fail',
        message: `Invaild new blog created by ${loginUser.username}`,
        show: true
      })
      setTimeout(() => {
        setMessage({
          status: '',
          message: '',
          show: false
        })
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    const deleteObject = await sortBlogs.find(blog => blog.id === id)
    const isRemove = window.confirm(`Remove ${deleteObject.title} by ${name} ?`)
    if (isRemove) {
      deleteBlog(id, deleteObject)
    }
  }
  const deleteBlog = async (id, deleteObject) => {
    try {
      await blogService.remove(id)

      setSortBlog( sortBlogs.filter(blog => blog.id !== id) )

      const loggedBlogJSONArr = window.localStorage.getItem('loggedSortBlogs')
      if (loggedBlogJSONArr) {
        const userBlog = JSON.parse(loggedBlogJSONArr)
        const newUserBlog = userBlog.filter(blog => blog.id !== id)
        window.localStorage.setItem('loggedSortBlogs', JSON.stringify(newUserBlog))
      }

      setMessage({
        status: 'success',
        message: `Success removed ${deleteObject.title} by ${loginUser.username}`,
        show: true
      })
      setTimeout(() => {
        setMessage({
          status: '',
          message: '',
          show: false
        })
      }, 5000)
    } catch (e) {
      setMessage({
        status: 'fail',
        message: `Delete ${deleteObject.title} failed by ${loginUser.username}`,
        show: true
      })
      setTimeout(() => {
        setMessage({
          status: '',
          message: '',
          show: false
        })
      }, 5000)
    }
  }

  const handleAddLikes = (id) => {
    const changingBlog = sortBlogs.find(blog => blog.id === id)

    if (changingBlog) {
      const changeObject = {
        ...changingBlog,
        likes: changingBlog.likes += 1
      }

      changeBlog(id, changeObject)
    }

  }
  const changeBlog = async (id, changeObject) => {
    try {
      const update = await blogService.update(id, changeObject)
      if (update) {
        const loggedBlogJSONArr = window.localStorage.getItem('loggedSortBlogs')
        if (loggedBlogJSONArr) {
          const userBlog = JSON.parse(loggedBlogJSONArr)
          const newUserBlog = userBlog.map(blog => blog.id !== id ? blog : update)
          window.localStorage.setItem('loggedSortBlogs', JSON.stringify(newUserBlog))
        }

        setMessage({
          status: 'success',
          message: `like +1 for ${changeObject.title} by ${loginUser.username}`,
          show: true
        })
        setTimeout(() => {
          setMessage({
            status: '',
            message: '',
            show: false
          })
        }, 5000)
      }
    } catch (e) {
      setMessage({
        status: 'fail',
        message: `failed like +1 for ${changeObject.title} failed by ${loginUser.username}`,
        show: true
      })
      setTimeout(() => {
        setMessage({
          status: '',
          message: '',
          show: false
        })
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="log in" ref={loginFormRef}
    >
      <LoginForm loginObj={loginSubmit} />
    </Togglable>
  )
  return (
    <div>
      <h1>Blogs</h1>
      <Notify notify={ notify } />
      {
        loginUser === null ?
          <LoginForm loginObj={loginSubmit} />:
          (
            <div>
              <div>
                <b>{ name }</b> logged in
                <button type="reset" onClick={handleLogout}>logout</button>
              </div>

              <div>
                { loginForm() }
              </div>
              <div>
                { blogForm() }
              </div>

              <h2>blog lists</h2>
              <div>
                {sortBlogs && sortBlogs.length > 0 ?
                  sortBlogs.map(blog =>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      handleRemove={handleRemove}
                      handleAddLikes={handleAddLikes}
                    />)
                  : 'Blog not yet added'
                }
              </div>
            </div>
          )
      }
    </div>
  )
}

export default App