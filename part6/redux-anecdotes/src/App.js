import React, { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'

import { initializeAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnec())
    }, [dispatch])

    return (
        <div>
            <AnecdotesList />
            <AnecdoteForm />
        </div>
    )
}

export default App