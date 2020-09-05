import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/anecdoteReducer'

const Filter = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    console.log('Filter_State', anecdotes)

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const searchValue = event.target.value
        console.log('searchValue', searchValue)

        const searchResult = anecdotes.filter(f => f.content.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 )

        console.log('searchResult', searchResult)
        dispatch(filter(searchResult))

    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter