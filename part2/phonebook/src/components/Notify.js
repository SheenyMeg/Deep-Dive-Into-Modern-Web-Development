import React from 'react'

const Notify = ({ notifyStatus }) => {
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

    if (notifyStatus.status === 'error') {
        return (
            <h2 style={notifyStatus.show ? errorNotifyStyle : hiddenNotifyStyle}>
                {notifyStatus.message}
            </h2>
        )
    }
    return (
        <h2 style={notifyStatus.show ? successNotifyStyle : hiddenNotifyStyle}>
            {notifyStatus.message}
        </h2>
    )
}

export default Notify