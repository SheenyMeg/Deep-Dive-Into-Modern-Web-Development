import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { showNotify } from '../reducers/notifyReducer'

const AnecdoteForm = (props) => {

    // const dispatch = useDispatch()

    // const addNew = async (event) => {
    //     event.preventDefault()
    //     const anecdote = event.target.anecdote.value
    //     event.target.anecdote.value = ''

    //     dispatch( createAnec(anecdote) )

    //     dispatch( showNotify(`You add '${anecdote}'`, 5) )
    // }

    const addNew = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.createAnec(anecdote)

        props.showNotify(`You add '${anecdote}'`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnec,
    showNotify
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
