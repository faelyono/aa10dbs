import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      const res = await fetch(`${API}/notes`)
      const data = await res.json()
      setNotes(data)
    } catch (err) {
      setError('Failed to load notes. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`${API}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      const newNote = await res.json()
      setNotes([newNote, ...notes])
      setTitle('')
      setContent('')
    } catch (err) {
      setError('Failed to create note.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API}/notes/${id}`, { method: 'DELETE' })
      setNotes(notes.filter(n => n.id !== id))
    } catch (err) {
      setError('Failed to delete note.')
    }
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="app">
      <div className="header">
        <h1>my<span>notes</span></h1>
        <p>// a simple note-taking app — react + express + postgresql</p>
      </div>

      <div className="form-box">
        <h2>+ new note</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button className="btn-add" type="submit" disabled={submitting || !title.trim() || !content.trim()}>
            {submitting ? 'Saving...' : 'Add Note'}
          </button>
        </form>
      </div>

      <div className="notes-section">
        <h2>— all notes ({notes.length})</h2>
        {loading ? (
          <div className="loading">loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <span>📝</span>
            no notes yet. create your first one above.
          </div>
        ) : (
          <div className="notes-list">
            {notes.map(note => (
              <div className="note-card" key={note.id}>
                <div className="note-body">
                  <div className="note-title">{note.title}</div>
                  <div className="note-content">{note.content}</div>
                  <div className="note-date">{formatDate(note.created_at)}</div>
                </div>
                <button className="btn-delete" onClick={() => handleDelete(note.id)}>
                  delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
