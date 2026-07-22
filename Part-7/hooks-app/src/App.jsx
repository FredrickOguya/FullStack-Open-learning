
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {

 
  const [name, setName] = useLocalStorage('name', '')
  

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name}! (your name is tored in localStorage)</p>
    </div>
  )
}

export default App
