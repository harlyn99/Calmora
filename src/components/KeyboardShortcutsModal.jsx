import React from 'react'
import { X, Keyboard } from 'lucide-react'
import './KeyboardShortcutsModal.css'

const shortcuts = [
  { category: 'Navigation', items: [
    { keys: ['G', 'D'], action: 'Go to Dashboard' },
    { keys: ['G', 'T'], action: 'Go to To-Do' },
    { keys: ['G', 'J'], action: 'Go to Journal' },
    { keys: ['G', 'P'], action: 'Go to Planner' },
    { keys: ['G', 'H'], action: 'Go to Habits' },
    { keys: ['G', 'M'], action: 'Go to Mood' },
    { keys: ['G', 'G'], action: 'Go to Goals' },
    { keys: ['G', 'S'], action: 'Go to Stats' },
  ]},
  { category: 'Actions', items: [
    { keys: ['N'], action: 'New task/note (on relevant pages)' },
    { keys: ['H'], action: 'Go to Habits' },
    { keys: ['T'], action: 'Go to Timer' },
  ]}
]

export const KeyboardShortcutsModal = ({ onClose }) => {
  return (
    <div className="shortcuts-modal-overlay" onClick={onClose}>
      <div className="shortcuts-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-modal-header">
          <div className="shortcuts-modal-title">
            <Keyboard size={24} />
            <h2>Keyboard Shortcuts</h2>
          </div>
          <button className="shortcuts-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="shortcuts-modal-body">
          {shortcuts.map((section, idx) => (
            <div key={idx} className="shortcuts-section">
              <h3>{section.category}</h3>
              <div className="shortcuts-list">
                {section.items.map((shortcut, i) => (
                  <div key={i} className="shortcut-item">
                    <div className="shortcut-keys">
                      {shortcut.keys.map((key, k) => (
                        <kbd key={k}>{key}</kbd>
                      ))}
                    </div>
                    <span className="shortcut-action">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="shortcuts-tip">
            <p>💡 <strong>Tip:</strong> Shortcuts work when not typing in input fields.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyboardShortcutsModal
