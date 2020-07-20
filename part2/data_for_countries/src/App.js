import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './components/Result.js'

const App = () => {
    const [countries, setCountry] = useState([])
    const [search, setSearch] = useState('')
    const [results, setResult] = useState([])
    console.log('countries', countries)
    const [show, setShow] = useState(false)
    const [text, setShowText] = useState('show')
   
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountry(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        const result = (search) => {
            return countries.filter(country => country.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        }
        const countryArr = result(search)
        setResult(countryArr)
        console.log('results', results)
    }   
    const handleShowClick = () => {
        setShow(!show)
        if (show) {
            setShowText('show')
            
        }else{
            setShowText('hidden')
        }
    }

    const titleStyle = {
        color: 'blue'
    }
    const inputTitleStyle = {
        marginTop: 20,
        fontSize: 20
    }
    const inputStyle = {
        width: 250,
        height: 25,
        fontSize: 18
    }
    return (
        <div>
            <h1 style={titleStyle}>Data for countries</h1>
            <div style={inputTitleStyle}>
                Find countries: <input type="text"
                                       value={search}
                                       onChange={handleSearchChange} 
                                       style={inputStyle}
                                />
            </div>
           <Result results={results} 
                   showClick={handleShowClick} 
                   show={show} 
                   text={text}
            />
        </div>
    )
}

export default App
