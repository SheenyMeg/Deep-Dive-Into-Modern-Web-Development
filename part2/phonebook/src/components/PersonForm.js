import React from 'react'

const PersonForm = ({ onSubmit, onClick, name, number, nameChange, numberChange}) => {

    const formStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const personFormStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
    const inputStyle = {
        paddingLeft: 20
    }
    const buttonStyle = {
        marginLeft: 15
    }
    return (
        <div style={personFormStyle}>
            <form onSubmit={onSubmit} style={formStyle}>
                <div>
                    name: <input type="text"
                                 value={name}
                                 onChange={nameChange}
                            />
                </div>
                <div style={inputStyle}>
                    number: <input type="text"
                                   value={number}
                                   onChange={numberChange}
                                   
                            />
                </div>
            </form>
            <button onClick={onClick} style={buttonStyle}>add</button>
        </div>
    )
}

export default PersonForm