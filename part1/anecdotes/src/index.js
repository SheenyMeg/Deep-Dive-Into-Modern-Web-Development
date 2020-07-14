import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)
const App = () => {
  const title1 = 'Anecdotes of the Day'
  const title2 = 'Anecdotes with most votes'
  
  const [selected, setSelected] = useState(0)
  const [points, setVotes] = useState(new Array(6).fill(0))
  console.log('points', points)
  console.log('selected', selected)

  const handleNextClick = () => {
    setSelected(selected + 1)
  }
  const handleVotesClick = () => {
    const copy = [...points]
    copy[selected] += 1
    copy.fill(copy[selected], selected, selected + 1)
    setVotes([...copy])
  }
 
  const mostIndex = [...points].findIndex((item) => item === Math.max(...points))
  console.log('mostIndex', mostIndex)
  
  const handleBackClick = () => {
    setSelected(selected - 5)
  }
  if (selected === anecdotes.length-1){
    return (
    <div>
      <h2>{title1}</h2>
      <p>There is nothing</p>
      <div>
        <Button onClick={handleBackClick} text='back the first' />
      </div>
      <h2>{title2}</h2>
      <p>There is nothing</p>
    </div>
    )
  }
  return (
    <div>
      <h2>{title1}</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <Button onClick={handleVotesClick} text='vote' />
        <Button onClick={handleNextClick} text='next anecdotes' />
      </div>
      <h2>{title2}</h2>
      <p>{anecdotes[mostIndex]}</p>
      <p>has {points[mostIndex]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)