import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import styled from "styled-components"

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border:2px solid Chocolate;
  border-radius: 3px
`
const Input = styled.input`
margin: 0.25;
width: 300px;
`
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
    }, 5000)
    
  }
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={handleAddNote}>
        <Input
          value={newNote} 
          onChange={(event) => setNewNote(event.target.value)}
          label='note content'
          placeholder="write note here"
          />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>save</Button>
      </form>
    </div>
  )
}

export default NoteForm