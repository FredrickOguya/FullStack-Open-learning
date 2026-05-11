import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import NoteList from './components/NoteList'
import Home from './components/Home'

const App = () => {
  const [notes, setNotes] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
        })
        .catch(() => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

  const addNote = noteObject => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const padding = {
    padding: 5
  }


  return (

    <Router>
      <div>
        <Notification message={errorMessage}/>
        <Link style = {padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
      </div>

      <Routes>
        <Route path="/notes/:id" element ={
          <Note notes={notes} toggleImportanceOf={toggleImportanceOf} />
        }/>
        <Route path="/notes" element={
          <NoteList
           notes={notes} 
           toggleImportanceOf={toggleImportanceOf}
           setErrorMessage={setErrorMessage}
           setNotes={setNotes}
          />
        }/>
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        }/>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
