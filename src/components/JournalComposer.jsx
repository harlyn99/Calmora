import React, { useState } from 'react'
import storage from '../utils/storage'

export const JournalComposer = () => {
  const [text, setText] = useState('')
  const [mood, setMood] = useState('🙂 Content')
  const [saved, setSaved] = useState(false)

  const save = () => {
    if (!text.trim()) return
    const entry = { date: new Date().toISOString(), content: text.trim(), mood }
    storage.push('journalEntries', entry)
    setText('')
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <textarea
        className="calm-text"
        placeholder="Write something calming..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', minHeight: 110, padding: 12, borderRadius: 10, border: '1px solid var(--border-color)' }}
      />

      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option>🙂 Content</option>
          <option>😊 Happy</option>
          <option>😌 Calm</option>
          <option>😔 Reflective</option>
        </select>

        <button className="neomorph-button primary" onClick={save}>Save</button>

        {saved && <span style={{color:'var(--success)'}}>Saved ✓</span>}
      </div>
    </div>
  )
}

export default JournalComposer
