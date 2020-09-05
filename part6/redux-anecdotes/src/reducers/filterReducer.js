const filterReducer = ( state = '', action ) => {
    console.log('Filter_Action', action)

    switch (action.type) {
    case 'FILTER':
        return action.content
    default:
        return state
    }
}

export const setFilter = (content) => {
    return async dispatch => {
        dispatch({
            type: 'FILTER',
            content
        })
    }
}

export default filterReducer