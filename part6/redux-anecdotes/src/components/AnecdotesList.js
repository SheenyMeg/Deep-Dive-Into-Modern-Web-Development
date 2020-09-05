import React from 'react'
// import {  useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { votes } from '../reducers/anecdoteReducer'
import { showNotify } from '../reducers/notifyReducer'

import Notification from '../components/Notification'
import Filter from '../components/Filter'

const AnecdotesList = (props) => {
    // const anecdotes = () => {
    //     return props.anecdotes
    // }
    // console.log('AnecdotesList_State', anecdotes)

    // const dispatch = useDispatch()

    // const vote = (id) => {
        
    //     const votedAnec = anecdotes.find(a => a.id === id)
    //     console.log('votedAnec', votedAnec)

    //     dispatch(votes(id, votedAnec))

    //     dispatch( showNotify(`You voted '${votedAnec.content}' `, 5))
    // }

    const vote = (id) => {
        
        const votedAnec = props.anecdotes.find(a => a.id === id)
        console.log('votedAnec', votedAnec)

        props.votes(id, votedAnec)

        props.showNotify(`You voted '${votedAnec.content}' `, 5)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {props.anecdotes.map(anecdote =>
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
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    votes,
    showNotify
}
const ConnectedAnec = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdotesList)
export default ConnectedAnec