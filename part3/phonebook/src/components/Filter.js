import React from 'react'

const Filter = ({ search, onChange }) => {
    return (
        <div>
            filter shown with: <input type="text"
                                      value={search}
                                      onChange={onChange}
                />
        </div>
    )
}

export default Filter