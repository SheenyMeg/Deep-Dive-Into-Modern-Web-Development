import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)
const Statistics = ({ text, value, allClicks, all, good }) => {
    if (text === 'average' && allClicks.length !== 0) {
       value = allClicks.reduce( (acu, cur) => acu + cur)/all
        return (
            <div>
                <table>
                    <tr>
                        <td>{text} {value.toFixed(1)}</td>
                    </tr>
                </table>
            </div>
        )
    }
    if (text === 'positive' && good > 0 ) {
        value = (good/all)*100
        return (
            <div>
                <table>
                    <tr>
                        <td>{text} {value.toFixed(1)} %</td>
                    </tr>
                </table>
            </div>
        )
    }
    return (
        <div>
            <table>
                <tr>
                    <td>{text} {value}</td>
                </tr>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const title1 = 'give feedback'
    const title2 = 'statistics'

    const [clicks, setClick] = useState({
        good: 0, 
        neutral: 0, 
        bad: 0, 
        all: 0,
        average: 0,
        positive: 0,
    })
    const [allClicks, setAll] = useState([])

    const handleGoodClick = 
    () => {
        setAll(allClicks.concat(1))
        setClick({
            ...clicks, 
            good: clicks.good + 1, 
            all: clicks.all + 1
        })
    }
    
    const handleNeutralClick = 
    () => {
        setAll(allClicks.concat(0))
        setClick({
            ...clicks, 
            neutral: clicks.neutral + 1, 
            all: clicks.all + 1,
        })
    }
    
    const handleBadClick = 
    () => {
        setAll(allClicks.concat(-1))
        setClick({
            ...clicks, 
            bad: clicks.bad + 1, 
            all: clicks.all + 1
        })
    }
    
    if (allClicks.length === 0) {
        return (
            <div>
                <h1>{title1}</h1>
                <div>
                    <Button onClick={handleGoodClick} text='good' />
                    <Button onClick={handleNeutralClick} text='neutral' />
                    <Button onClick={handleBadClick} text='bad' />
                </div>
                <h2>{title2}</h2>
                <div>
                    <p>Not feedback given</p>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h1>{title1}</h1>
            <div>
                <Button onClick={handleGoodClick} text='good' />
                <Button onClick={handleNeutralClick} text='neutral' />
                <Button onClick={handleBadClick} text='bad' />
            </div>
            <h2>{title2}</h2>
            <div>
                <Statistics text='good' 
                            value={clicks.good} 
                            allClicks={allClicks} 
                />
                <Statistics text='neutral' 
                            value={clicks.neutral} 
                            allClicks={allClicks} 
                />
                <Statistics text='bad' 
                            value={clicks.bad} 
                            allClicks={allClicks} 
                />
                <Statistics text='all' 
                            value={clicks.all} 
                            allClicks={allClicks} 
                />
                <Statistics text='average'
                            value={clicks.average} 
                            all={clicks.all} 
                            allClicks={allClicks} 
                />
                <Statistics text='positive' 
                            value={clicks.positive} 
                            all={clicks.all} 
                            good={clicks.good}
                            allClicks={allClicks}
                />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)