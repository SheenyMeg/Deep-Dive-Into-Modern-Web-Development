import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { votes } from '../reducers/anecdoteReducer'
import { showNotify } from '../reducers/notifyReducer'

import Notification from '../components/Notification'
import Filter from '../components/Filter'

const AnecdotesList = () => {
    const anecdotes = useSelector(state => {
        const filter = state.filter.toLowerCase()
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    })
    console.log('AnecdotesList_State', anecdotes)

    const dispatch = useDispatch()

    const vote = (id) => {

        const votedAnec = anecdotes.find(a => a.id === id)

        dispatch(votes(id, votedAnec))

        dispatch( showNotify(`You voted '${votedAnec.content}' `, 5))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdotesList