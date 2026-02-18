import React, { useState, useEffect } from 'react'

export const OnboardingModal = ({ onClose }) => {
  return (
    <div style={{position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:1200}}>
      <div className="neomorph-lg" style={{width: '92%', maxWidth:540, padding:20}}>
        <h2>Welcome to Calmora</h2>
        <p style={{color:'var(--text-muted)'}}>Quick tips:</p>
        <ul style={{marginTop:8, marginBottom:12}}>
          <li>Use <strong>Energy Mode</strong> (More Options) to switch Focus/Calm/Balance.</li>
          <li>Mini Insight summarizes your focus time and journal activity.</li>
          <li>Use Sync / Export to backup your data.</li>
        </ul>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button className="neomorph-button" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingModal
