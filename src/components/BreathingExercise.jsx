import React, { useState, useEffect } from 'react'
import { Wind, Play, RotateCcw, X } from 'lucide-react'
import './BreathingExercise.css'

const breathingTechniques = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: '4-4-4-4 technique for stress relief',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdEmpty: 4,
    color: '#4a90e2'
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Relaxing breath for better sleep',
    inhale: 4,
    hold: 7,
    exhale: 8,
    holdEmpty: 0,
    color: '#7ed321'
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description: '5-5 rhythm for balance',
    inhale: 5,
    hold: 0,
    exhale: 5,
    holdEmpty: 0,
    color: '#bd10e0'
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    description: 'Quick energy boost',
    inhale: 6,
    hold: 0,
    exhale: 2,
    holdEmpty: 0,
    color: '#f5a623'
  }
]

export const BreathingExercise = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTechnique, setSelectedTechnique] = useState(breathingTechniques[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState('idle') // idle, inhale, hold, exhale, holdEmpty
  const [counter, setCounter] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [targetCycles, setTargetCycles] = useState(5)

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCounter(prev => {
          const technique = selectedTechnique
          const phaseDurations = {
            inhale: technique.inhale,
            hold: technique.hold,
            exhale: technique.exhale,
            holdEmpty: technique.holdEmpty
          }

          const currentPhaseDuration = phaseDurations[phase]
          
          if (prev >= currentPhaseDuration) {
            // Move to next phase
            if (phase === 'inhale' && technique.hold > 0) {
              setPhase('hold')
            } else if (phase === 'inhale' || (phase === 'hold' && technique.hold > 0)) {
              setPhase('exhale')
            } else if (phase === 'exhale' && technique.holdEmpty > 0) {
              setPhase('holdEmpty')
            } else if (phase === 'exhale' || (phase === 'holdEmpty' && technique.holdEmpty > 0)) {
              setCycles(c => c + 1)
              if (cycles + 1 >= targetCycles) {
                setIsPlaying(false)
                setPhase('idle')
                return 0
              }
              setPhase('inhale')
            }
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, phase, selectedTechnique, cycles, targetCycles])

  const startExercise = () => {
    setPhase('inhale')
    setCounter(0)
    setCycles(0)
    setIsPlaying(true)
  }

  const resetExercise = () => {
    setIsPlaying(false)
    setPhase('idle')
    setCounter(0)
    setCycles(0)
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'holdEmpty': return 'Hold'
      default: return 'Ready'
    }
  }

  const getCircleScale = () => {
    if (phase === 'inhale') return 1.5
    if (phase === 'exhale') return 0.8
    return 1
  }

  const getProgress = () => {
    const phaseDurations = {
      inhale: selectedTechnique.inhale,
      hold: selectedTechnique.hold,
      exhale: selectedTechnique.exhale,
      holdEmpty: selectedTechnique.holdEmpty
    }
    const currentDuration = phaseDurations[phase] || 1
    return ((counter + 1) / currentDuration) * 100
  }

  return (
    <>
      <button 
        className="breathing-fab" 
        onClick={() => setIsOpen(true)}
        style={{ background: selectedTechnique.color }}
      >
        <Wind size={24} />
      </button>

      {isOpen && (
        <div className="breathing-overlay" onClick={() => setIsOpen(false)}>
          <div className="breathing-modal" onClick={(e) => e.stopPropagation()}>
            <div className="breathing-header">
              <h2>Breathing Exercises</h2>
              <button className="breathing-close" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {!isPlaying ? (
              <>
                <div className="technique-selector">
                  <h3>Choose Technique</h3>
                  <div className="techniques-grid">
                    {breathingTechniques.map(technique => (
                      <button
                        key={technique.id}
                        className={`technique-card ${selectedTechnique.id === technique.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTechnique(technique)}
                        style={{ '--technique-color': technique.color }}
                      >
                        <div className="technique-icon" style={{ background: `${technique.color}20`, color: technique.color }}>
                          <Wind size={24} />
                        </div>
                        <h4>{technique.name}</h4>
                        <p>{technique.description}</p>
                        <div className="technique-timing">
                          <span>{technique.inhale}s inhale</span>
                          {technique.hold > 0 && <span>{technique.hold}s hold</span>}
                          <span>{technique.exhale}s exhale</span>
                          {technique.holdEmpty > 0 && <span>{technique.holdEmpty}s hold</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="breathing-settings">
                  <label>Cycles: {targetCycles}</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={targetCycles}
                    onChange={(e) => setTargetCycles(parseInt(e.target.value))}
                  />
                </div>

                <button className="start-breathing-btn" onClick={startExercise}>
                  <Play size={20} /> Start Exercise
                </button>
              </>
            ) : (
              <div className="breathing-exercise-active">
                <div className="phase-indicator">
                  <div 
                    className="breathing-circle"
                    style={{ 
                      transform: `scale(${getCircleScale()})`,
                      background: `linear-gradient(135deg, ${selectedTechnique.color}, ${selectedTechnique.color}88)`
                    }}
                  >
                    <svg className="progress-ring">
                      <circle
                        className="progress-ring-track"
                        cx="100"
                        cy="100"
                        r="90"
                      />
                      <circle
                        className="progress-ring-bar"
                        cx="100"
                        cy="100"
                        r="90"
                        style={{
                          strokeDashoffset: 565 - (565 * getProgress()) / 100
                        }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="phase-info">
                  <h3>{getPhaseText()}</h3>
                  <p>Cycle {cycles + 1} of {targetCycles}</p>
                </div>

                <div className="breathing-controls">
                  <button className="reset-breathing-btn" onClick={resetExercise}>
                    <RotateCcw size={18} /> Stop
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default BreathingExercise
