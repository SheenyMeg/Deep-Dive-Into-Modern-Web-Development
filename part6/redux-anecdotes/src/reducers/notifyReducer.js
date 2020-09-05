const notifyReducer = ( state = '', action ) => {
    console.log('Notify_Action', action)

    switch (action.type) {
    case 'SHOW_NOTIFY':
        return action.showInfo
    case 'HIDE_NOTIFY':
        return action.showInfo
    default:
        return state
    }
}

let timeOut
export const showNotify = (showInfo, time) => {
    return async dispatch => {
        await dispatch ({
            type: 'SHOW_NOTIFY',
            showInfo
        })

        if (timeOut) {
            clearTimeout(timeOut)
        }

        timeOut = setTimeout(() => {
            dispatch ({
                type: 'HIDE_NOTIFY',
                showInfo: ''
            })
        }, time * 1000)
    }
}

export default notifyReducer