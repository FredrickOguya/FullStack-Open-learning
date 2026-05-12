import { useNavigate, useParams } from "react-router-dom"

const Note = ({ notes, toggleImportance , deleteNote }) => {

  const navigate = useNavigate()
  const id = useParams().id
  const note = notes.find(n => n.id === id)

  const label = note.important ? 'maken not important' : 'make important'

  const handleDelete = () => {
    if(window.confirm(`Delete note "${note.content}"?`)){
      deleteNote(id)
      navigate('/notes')
    }
  }

  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handleDelete}>delete</button>
    </li>
  )
}

export default Note
