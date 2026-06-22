import { useNoteActions, useNotes } from "./store"

const App = () => {
  const notes = useNotes()
  const { add } = useNoteActions()

  const generatedId = () => Number((Math.random()* 1000000).toFixed(0))

  const addNote = (e) => {
    e.preventDefault()
    const content = e.target.note.value
    add({id: generatedId(), content, important: false})
    e.target.reset()
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note"/>
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note => (
          <li>
            {note.important ? <strong>{note.content}</strong> : note.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App