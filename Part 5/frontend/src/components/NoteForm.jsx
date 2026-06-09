import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button } from "@mui/material"
import Notification from "./Notification"
const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const handleAddNote = async (event) => {
    event.preventDefault()
    await createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
    setTimeout(() => {
      navigate('/notes')
    }, 1000)
    
  }
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={handleAddNote}>
        <TextField 
          value={newNote} 
          onChange={(event) => setNewNote(event.target.value)}
          label='note content'
          />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>save</Button>
      </form>
    </div>
  )
}

export default NoteForm