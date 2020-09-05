import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notify)
  console.log('Notification_State', notification)
  
  const showStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hideStyle = {
    display: 'none'
  }
  return (
    <div style={ notification === '' ? hideStyle : showStyle }>
      {notification}
    </div>
  )
}

export default Notification