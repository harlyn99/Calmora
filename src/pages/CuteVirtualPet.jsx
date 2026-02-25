import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { TopNavigation } from '../components/TopNavigation'
import PetDisplay from '../components/PetDisplay'
import './CuteVirtualPet.css'

const CuteVirtualPet = () => {
  const [petType, setPetType] = useState('cat')
  const [expression, setExpression] = useState('happy')

  const pets = ['cat', 'dog', 'bunny', 'hamster', 'bird', 'bear', 'fox', 'panda', 'raccoon', 'elephant', 'penguin', 'owl', 'unicorn', 'dragon', 'phoenix', 'griffin', 'celestial']

  return (
    <div className="cute-virtual-pet-page">
      <TopNavigation currentPage="pet" />
      
      <div className="page-content">
        <div className="page-header">
          <h1><Heart /> Virtual Pet - 17 Animals</h1>
        </div>

        <PetDisplay petType={petType} expression={expression} size="large" />

        <div className="pet-selector">
          <label>Pilih Pet:</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            {pets.map(pet => (
              <button
                key={pet}
                onClick={() => setPetType(pet)}
                style={{
                  padding: '8px 16px',
                  background: petType === pet ? '#6b9f7f' : '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {pet}
              </button>
            ))}
          </div>
        </div>

        <div className="expression-selector">
          <label>Expression:</label>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            {['happy', 'normal', 'excited', 'sleepy', 'love'].map(expr => (
              <button
                key={expr}
                onClick={() => setExpression(expr)}
                style={{
                  padding: '8px 16px',
                  background: expression === expr ? '#6b9f7f' : '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {expr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CuteVirtualPet
