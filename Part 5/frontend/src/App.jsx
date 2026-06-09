import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import { AppBar, Button, Container, Toolbar } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'
import NoteList from './components/NoteList'
import Home from './components/Home'
import { Alert } from '@mui/material'
const App = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
        })
        .catch(() => {
          setNotification({
            text: `Note '${note.content}' was already removed from server`,
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

  const addNote = (noteObject) => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNotification({ 
        text: `Note '${returnedNote.content}' added!`, 
        type:'success'
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }



  const match = useMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === match.params.id)
  : null

  const style = { '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' } }


  return (

    <Container>
        <AppBar position='static'>
          <Toolbar>
            <Button color='inherit' component={Link}  to="/" sx={style}>home</Button>
            <Button color='inherit' component={Link} to="/notes" sx={style}>notes</Button>
            <Button color='inherit' component={Link} to="/create" sx={style}>new note</Button>
          </Toolbar>
        </AppBar>

        <Notification notification={notification}/>

        <Routes>
          <Route path="/notes/:id" element ={
            <Note notes={notes} toggleImportanceOf={toggleImportanceOf} note={note} deleteNote={deleteNote}/>
          }/>
          <Route path="/notes" element={
            <NoteList
            notes={notes} 
            toggleImportanceOf={toggleImportanceOf}
            setNotification={setNotification}
            deleteNote={deleteNote}
            />
          }/>
          <Route path="/create" element={     
            <NoteForm createNote={addNote}/>
          }/>
          <Route path="/" element={<Home/>} />
      </Routes>
    </Container>
    
  )
}

export default App
