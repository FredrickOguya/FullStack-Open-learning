import { getNoteById } from "../../Services/notes"
import { notFound } from "next/navigation"

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const note = getNoteById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <p>{note.important ? "Important" : "Not important"}</p>
    </div>
  )
}

export default NotePage