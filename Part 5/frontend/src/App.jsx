import { useEffect } from "react"
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"
import { useNoteActions } from "./store"
import VisibilityFilter from "./VisibilityFilter"
import noteService from './services/notes'

const App = () => {
  const { initialize } = useNoteActions()

  useEffect(() => {
    initilize()
  }, [initialize])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App