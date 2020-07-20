import React from 'react'

const Persons = ({ persons, onClick }) => {
    const personsStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
    const buttonStyle = {
        marginLeft: 10
    }
    return (
        <div>
            {persons.map(person => 
                <div key={person.id} style={personsStyle}>
                        <p>{person.name} {person.number}</p>   
                        <button onClick={ () => onClick(person.id) } 
                                style={buttonStyle}
                        >
                            delete
                        </button> 
                </div>
                )
            } 
        </div>      
    )
}

export default Persons