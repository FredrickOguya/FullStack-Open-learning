import { useState, useRef, useEffect } from 'react'
import noteService from '../services/notes'
import NoteForm from './NoteForm'
import loginService from '../services/login'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import Footer from './Footer'
import Notification from './Notification'
import Note from './Note'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const NoteList = ({ notes, setNotification, setNotes}) => {

  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
      noteFormRef.current.toggleVisibility()
      noteService
      .create(noteObject)
      .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }



  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      setNotification({text: 'wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleSubmit={handleLogin}
      />
    </Togglable>
  )

  return (

    <div>
      <h1>Notes</h1>
      
      
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged</p>
          {noteForm()}
        </div>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesToShow.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </TableCell>
              <TableCell>
                {note.user.name}
              </TableCell>
              <TableCell>
                {note.important ? 'yes' : ''}
              </TableCell>
            </TableRow>
            ))}  
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        
      </ul>
      <Footer/>
    </div>
  )
}

export default NoteList