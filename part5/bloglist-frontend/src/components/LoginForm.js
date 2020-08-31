import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginObj }) => {
  LoginForm.propTypes = {
    loginObj: PropTypes.func.isRequired
  }
  const [loginInfo, setLoginInfo] = useState(
    {
      username: '',
      password: ''
    }
  )

  const handleUsernameChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      username: event.target.value
    })
  }

  const handlePasswordChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      password: event.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    loginObj({
      username: loginInfo.username,
      password: loginInfo.password
    })
  }

  return (
    <div id='loginForm'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            autoComplete="true"
            type="text"
            value={loginInfo.username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            autoComplete="true"
            type="password"
            value={loginInfo.password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
