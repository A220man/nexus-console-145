import { useState, useEffect } from 'react'
import './App.css'

interface Theme {
  id: string
  name: string
  genre: string
  description: string
}

interface DealResponse {
  themes: Theme[]
  genre: string
}

function App() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchThemes() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/themes')
      if (!res.ok) throw new Error('Failed to fetch themes')
      const data = await res.json()
      setThemes(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  async function dealThemes(genre?: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/themes/deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre }),
      })
      if (!res.ok) throw new Error('Failed to deal themes')
      const data: DealResponse = await res.json()
      setThemes(data.themes)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThemes()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>Nexus Console 145</h1>
        <p>Anti-AI-slop design skill</p>
      </header>
      <main>
        <section className="controls">
          <button onClick={() => dealThemes()} disabled={loading}>
            {loading ? 'Dealing...' : 'Deal Themes'}
          </button>
          <button onClick={() => dealThemes('clean')} disabled={loading}>
            Clean
          </button>
          <button onClick={() => dealThemes('bold')} disabled={loading}>
            Bold
          </button>
          <button onClick={() => dealThemes('refined')} disabled={loading}>
            Refined
          </button>
        </section>
        {error && <div className="error">{error}</div>}
        <section className="themes">
          {themes.map((theme) => (
            <article key={theme.id} className="theme-card">
              <h2>{theme.name}</h2>
              <span className="genre">{theme.genre}</span>
              <p>{theme.description}</p>
            </article>
          ))}
        </section>
      </main>
      <footer>
        <a href="/health" target="_blank" rel="noopener noreferrer">
          Health Check
        </a>
      </footer>
    </div>
  )
}

export default App
