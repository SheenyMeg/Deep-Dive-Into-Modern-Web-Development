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
    const inputDivStyle = {
        paddingLeft: 30
    }
    const inputStyle = {
        width: 200
    }
    const buttonStyle = {
        marginLeft: 15
    }
    return (
        <div style={personFormStyle}>
            <form onSubmit={onSubmit} style={formStyle}>
                <div>
                    name: <input type="text"
                                 placeholder="your name: Aan"
                                 value={name}
                                 onChange={nameChange}
                            />
                </div>
                <div style={inputDivStyle}>
                    number: <input type="text"
                                   placeholder="your number: 14028760987"
                                   value={number}
                                   onChange={numberChange}
                                   style={inputStyle}
                            />
                </div>
                <button type="submit" style={buttonStyle}>add</button>
            </form>
        </div>
    )
}

export default PersonForm