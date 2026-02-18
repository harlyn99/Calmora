import React, { useEffect, useState } from 'react'
import { getFocusSessions, getJournalEntries } from '../utils/dataAdapter'

const withinLastDays = (dateStr, days) => {
  const d = new Date(dateStr)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return d >= cutoff
}

export const MiniInsight = () => {
  const [totalFocusThisWeek, setTotalFocusThisWeek] = useState(0)
  const [mostProductiveDay, setMostProductiveDay] = useState('—')
  const [journalThisWeek, setJournalThisWeek] = useState(0)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const focusSessions = await getFocusSessions()
      const journalEntries = await getJournalEntries()

      const thisWeekSessions = (focusSessions || []).filter(s => withinLastDays(s.date, 7))
      const total = thisWeekSessions.reduce((s, cur) => s + (cur.minutes || 0), 0)

      const dayMap = {}
      thisWeekSessions.forEach(s => {
        const d = new Date(s.date).toLocaleDateString()
        dayMap[d] = (dayMap[d] || 0) + (s.minutes || 0)
      })
      let best = '—'
      if (Object.keys(dayMap).length) {
        best = Object.entries(dayMap).sort((a, b) => b[1] - a[1])[0][0]
      }

      const jCount = (journalEntries || []).filter(j => withinLastDays(j.date, 7)).length

      if (!mounted) return
      setTotalFocusThisWeek(total)
      setMostProductiveDay(best)
      setJournalThisWeek(jCount)
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="mini-insight-grid">
      <div className="insight-card neomorph-md">
        <p className="insight-label">Total Focus (this week)</p>
        <p className="insight-value">{totalFocusThisWeek} min</p>
      </div>

      <div className="insight-card neomorph-md">
        <p className="insight-label">Most productive day</p>
        <p className="insight-value">{mostProductiveDay}</p>
      </div>

      <div className="insight-card neomorph-md">
        <p className="insight-label">Journals (this week)</p>
        <p className="insight-value">{journalThisWeek}</p>
      </div>
    </div>
  )
}

export default MiniInsight
