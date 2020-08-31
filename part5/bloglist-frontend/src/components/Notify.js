import React from 'react'

const Notify = ({ notify }) => {
  const successNotifyStyle = {
    display: 'block',
    color: 'green',
    background: 'lightgrey',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginbottom: 10
  }
  const errorNotifyStyle = {
    display: 'block',
    color: 'red',
    background: 'lightgrey',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginbottom: 10
  }
  const hiddenNotifyStyle = {
    display: 'none'
  }

  if (notify.status === 'success') {
    return (
      <div id='success' style={notify.show ? successNotifyStyle : hiddenNotifyStyle}>
        {notify.message}
      </div>
    )
  }
  return (
    <div id='error' style={notify.show ? errorNotifyStyle : hiddenNotifyStyle}>
      {notify.message}
    </div>
  )
}

export default Notify
