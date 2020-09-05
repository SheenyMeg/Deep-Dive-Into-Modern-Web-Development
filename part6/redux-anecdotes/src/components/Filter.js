import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const searchValue = event.target.value
        console.log('searchValue', searchValue)

        dispatch( setFilter(searchValue) )
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