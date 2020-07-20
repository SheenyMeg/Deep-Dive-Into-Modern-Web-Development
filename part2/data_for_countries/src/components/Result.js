import React from 'react'

const Result = ({ results, showClick, show, text }) => {

    const tipStyle = {
        fontSize: 20,
        color: '#3797a4'
    }
    const buttonStyle = {
        marginLeft: 15,
        height: 25
    }
    if (results.length > 10) {
        return (
            <div> 
                <p style={tipStyle}>Too many matches,specify another filter</p>
            </div>
        )
    }
    if (results.length === 1) {
    }
    return (
        <div> 
            {results.map(result =>  
                <div key={result.name}>
                    <div>
                        <h2>{result.name}
                            <button onClick={showClick} style={buttonStyle}>{text}</button>
                        </h2>
                    </div>
                    <div>
                        {
                            show?(
                                <div>
                                    <p>capital: {result.capital}</p>
                                    <p>population: {result.population}</p>
                                    <h3>Spoken languages</h3>
                                    <ul>
                                        {result.languages.map(lang => 
                                            <li key={lang.name}>{lang.name}</li>
                                        )}
                                    </ul>
                                    <img src={result.flag} alt="flag" width='100' height='100' />
                                </div>
                            ):null
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Result