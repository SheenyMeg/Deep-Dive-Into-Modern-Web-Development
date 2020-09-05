import anecdotesService from '../services/anecdotesService'

const anecdoteReducer = ( state = [], action ) => {
    console.log('Anecdote_Action', action)

    switch (action.type) {
    case 'NEW_ANEC':
        return [...state, action.data]
    case 'INIT_ANECS':
        return action.data
    case 'VOTE':
    {
        const id = action.votedAnec.id
        const changed = state.map(a => a.id !== id ? a : action.votedAnec)

        const sortByVote = (a, b) => {
            return a.votes < b.votes ? 1 : -1
        }
        return changed.sort(sortByVote)
    }
    default:
        return state
    }
}

export const createAnec = (anecdote) => {
    return async dispatch => {
        const newAnec = await anecdotesService.createNew(anecdote)
        dispatch({
            type: 'NEW_ANEC',
            data: newAnec
        })
    }
}

export const votes = (id, voteAnec) => {
    return async dispatch => {
        const votedAnec = await anecdotesService.change(id, voteAnec)
        dispatch({
            type: 'VOTE',
            votedAnec
        })
    }
}

export const initializeAnec = () => {
    return async dispatch => {
        const initAnec = await anecdotesService.getAll()
        dispatch({
            type: 'INIT_ANECS',
            data: initAnec,
        })
    }
}
export default anecdoteReducer