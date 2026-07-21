
import { useState } from 'react'
import './App.css'
import { useCounter } from './hooks/useCounter'

function App() {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [height, setHeight] = useState('')
  

  return (
    <div>
      <form>
        name:
        <input
         type="text"
         value={name}
         onChange={(event) => setName(event.target.value)}
        />
        <br />
        birthdate:
        <input
          type='date'
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        <br />
        height:
        <input
         type="text" 
         value={height}
         onChange={(event) => setHeight(event.target.value)}
        />
      </form>
      <div>
        {name} {born} {height}
      </div>
    </div>
  )
}

export default App
