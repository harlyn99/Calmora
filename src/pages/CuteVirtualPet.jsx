import React, { useState, useEffect } from 'react'
import { Sparkles, Backpack, Coins, Star, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TopNavigation } from '../components/TopNavigation'
import PetDisplay from '../components/PetDisplay'
import GachaSystem from '../components/GachaSystem'
import Inventory from '../components/Inventory'
import { useTheme } from '../contexts/ThemeContext'
import './CuteVirtualPet.css'

const CuteVirtualPet = () => {
  const navigate = useNavigate()
  const { isDark, activeTheme } = useTheme()
  
  // State
  const [activeTab, setActiveTab] = useState('gacha') // 'pet', 'gacha', 'inventory', 'themes'
  const [coins, setCoins] = useState(1000)
  const [ownedPets, setOwnedPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [petExpression, setPetExpression] = useState('happy')
  const [equippedItems, setEquippedItems] = useState({})
  const [showNewPet, setShowNewPet] = useState(null)

  // Load data from localStorage
  useEffect(() => {
    const savedCoins = localStorage.getItem('petCoins')
    const savedTaskCoins = localStorage.getItem('taskCoins')
    const savedPlantCoins = localStorage.getItem('plantCoins')
    
    if (savedCoins) {
      setCoins(parseInt(savedCoins))
    } else {
      const taskCoins = parseInt(savedTaskCoins || '0')
      const plantCoins = parseInt(savedPlantCoins || '0')
      setCoins(taskCoins + plantCoins)
    }

    const savedOwnedPets = localStorage.getItem('ownedPets')
    if (savedOwnedPets) {
      const pets = JSON.parse(savedOwnedPets)
      setOwnedPets(pets)
      if (pets.length > 0) {
        setSelectedPet(pets[0].petType)
      }
    }

    const savedEquipped = localStorage.getItem('equippedItems')
    if (savedEquipped) {
      setEquippedItems(JSON.parse(savedEquipped))
    }
  }, [])

  // Save coins
  useEffect(() => {
    localStorage.setItem('petCoins', coins.toString())
    localStorage.setItem('taskCoins', coins.toString())
  }, [coins])

  // Save owned pets
  useEffect(() => {
    localStorage.setItem('ownedPets', JSON.stringify(ownedPets))
  }, [ownedPets])

  // Save equipped items
  useEffect(() => {
    localStorage.setItem('equippedItems', JSON.stringify(equippedItems))
  }, [equippedItems])

  // Handle coin change from gacha
  const handleCoinsChange = (newCoins) => {
    setCoins(newCoins)
  }

  // Handle gacha result - pet unlock
  const handleGachaResult = (results) => {
    results.forEach(result => {
      if (result.type === 'pet' && result.petType) {
        const newPet = {
          petType: result.petType,
          petName: result.name,
          rarity: result.rarity,
          obtainedAt: new Date().toISOString()
        }
        
        setOwnedPets(prev => {
          const alreadyOwned = prev.some(p => p.petType === result.petType)
          if (alreadyOwned) {
            setCoins(c => c + 200)
            alert(`Duplicate! ${result.name} sudah dimiliki.\n+200 coins compensation!`)
            return prev
          }
          setShowNewPet(newPet)
          return [...prev, newPet]
        })
      }
    })
  }

  // Handle equip/unequip
  const handleEquip = (item) => {
    setEquippedItems(prev => ({ ...prev, [item.type]: item }))
  }
  const handleUnequip = (type) => {
    const newEquipped = { ...equippedItems }
    delete newEquipped[type]
    setEquippedItems(newEquipped)
  }

  // All pets list
  const allPets = [
    { id: 'cat', name: 'Cat', rarity: 'common' },
    { id: 'dog', name: 'Dog', rarity: 'common' },
    { id: 'bunny', name: 'Bunny', rarity: 'common' },
    { id: 'hamster', name: 'Hamster', rarity: 'common' },
    { id: 'bird', name: 'Bird', rarity: 'common' },
    { id: 'bear', name: 'Bear', rarity: 'rare' },
    { id: 'fox', name: 'Fox', rarity: 'rare' },
    { id: 'panda', name: 'Panda', rarity: 'rare' },
    { id: 'raccoon', name: 'Raccoon', rarity: 'rare' },
    { id: 'elephant', name: 'Elephant', rarity: 'sr' },
    { id: 'penguin', name: 'Penguin', rarity: 'sr' },
    { id: 'owl', name: 'Owl', rarity: 'sr' },
    { id: 'unicorn', name: 'Unicorn', rarity: 'sr' },
    { id: 'dragon', name: 'Dragon', rarity: 'ssr' },
    { id: 'phoenix', name: 'Phoenix', rarity: 'ssr' },
    { id: 'griffin', name: 'Griffin', rarity: 'ssr' },
    { id: 'celestial', name: 'Celestial Cat', rarity: 'ssr' }
  ]

  return (
    <div className="cute-virtual-pet-page">
      <TopNavigation currentPage="pet" />

      <div className="page-content">
        {/* Header with Coins */}
        <div className="page-header">
          <h1>
            <Sparkles className="header-icon" />
            Gacha & Pets
          </h1>
          
          <div className="coin-display-header">
            <Coins size={24} className="coin-icon" />
            <span className="coin-amount">{coins}</span>
            <button className="earn-btn" onClick={() => setCoins(c => c + 100)}>
              + Earn 100
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'pet' ? 'active' : ''}`}
            onClick={() => setActiveTab('pet')}
          >
            <Star size={20} />
            <span>My Pets</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'gacha' ? 'active' : ''}`}
            onClick={() => setActiveTab('gacha')}
          >
            <Sparkles size={20} />
            <span>Gacha</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Backpack size={20} />
            <span>Inventory</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Pet Tab - Display owned pets */}
          {activeTab === 'pet' && (
            <div className="pet-tab">
              {ownedPets.length === 0 ? (
                <div className="pet-empty-state">
                  <div className="empty-icon">🎁</div>
                  <h2>Belum Punya Pet!</h2>
                  <p>Dapatkan pet dari Gacha</p>
                  <button 
                    className="go-gacha-btn"
                    onClick={() => setActiveTab('gacha')}
                  >
                    <Sparkles size={20} />
                    <span>Buka Gacha Sekarang!</span>
                  </button>
                </div>
              ) : (
                <div className="pet-showcase">
                  <PetDisplay
                    petType={selectedPet}
                    expression={petExpression}
                    equippedItems={equippedItems}
                    size="large"
                  />

                  <div className="pet-controls">
                    <div className="control-group">
                      <label>My Pets ({ownedPets.length}):</label>
                      <div className="pet-collection-selector">
                        {ownedPets.map(pet => (
                          <button
                            key={pet.petType}
                            className={`pet-collection-btn ${pet.rarity} ${selectedPet === pet.petType ? 'active' : ''}`}
                            onClick={() => setSelectedPet(pet.petType)}
                          >
                            <span className="pet-rarity-icon">
                              {pet.rarity === 'ssr' && '⭐'}
                              {pet.rarity === 'sr' && '💎'}
                              {pet.rarity === 'rare' && '✨'}
                              {pet.rarity === 'common' && '•'}
                            </span>
                            <span className="pet-name">{pet.petName}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="control-group">
                      <label>Expression:</label>
                      <div className="expression-selector">
                        {['happy', 'normal', 'excited', 'sleepy', 'love'].map(expr => (
                          <button
                            key={expr}
                            className={`expr-btn ${petExpression === expr ? 'active' : ''}`}
                            onClick={() => setPetExpression(expr)}
                          >
                            {expr === 'happy' && '😊'}
                            {expr === 'normal' && '😐'}
                            {expr === 'excited' && '🤩'}
                            {expr === 'sleepy' && '😴'}
                            {expr === 'love' && '😍'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pet-info-cards">
                <div className="info-card">
                  <h3>📋 Pet Collection</h3>
                  <div className="pet-list">
                    <p><strong>Common ({ownedPets.filter(p => p.rarity === 'common').length}/5):</strong> Cat, Dog, Bunny, Hamster, Bird</p>
                    <p><strong>Rare ({ownedPets.filter(p => p.rarity === 'rare').length}/4):</strong> Bear, Fox, Panda, Raccoon</p>
                    <p><strong>SR ({ownedPets.filter(p => p.rarity === 'sr').length}/4):</strong> Elephant, Penguin, Owl, Unicorn</p>
                    <p><strong>SSR ({ownedPets.filter(p => p.rarity === 'ssr').length}/4):</strong> Dragon, Phoenix, Griffin, Celestial</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gacha Tab */}
          {activeTab === 'gacha' && (
            <div className="gacha-tab">
              <GachaSystem
                coins={coins}
                onCoinsChange={handleCoinsChange}
                onGachaResult={handleGachaResult}
              />
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="inventory-tab">
              <Inventory
                equippedItems={equippedItems}
                onEquip={handleEquip}
                onUnequip={handleUnequip}
              />
            </div>
          )}
        </div>
      </div>

      {/* NEW PET VISUAL MODAL */}
      {showNewPet && (
        <div className="new-pet-modal">
          <div className="modal-overlay" onClick={() => setShowNewPet(null)}></div>
          <div className="new-pet-content">
            <div className="new-pet-header">
              <h2>🎉 Pet Baru!</h2>
              <button className="close-modal" onClick={() => setShowNewPet(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className={`new-pet-rarity ${showNewPet.rarity}`}>
              {showNewPet.rarity === 'ssr' && '⭐ LEGENDARY'}
              {showNewPet.rarity === 'sr' && '💎 SUPER RARE'}
              {showNewPet.rarity === 'rare' && '✨ RARE'}
              {showNewPet.rarity === 'common' && '• COMMON'}
            </div>

            <div className="new-pet-display">
              <PetDisplay
                petType={showNewPet.petType}
                expression="excited"
                equippedItems={{}}
                size="large"
              />
            </div>

            <div className="new-pet-info">
              <h3 className="new-pet-name">{showNewPet.petName}</h3>
              <p>Pet sudah ditambahkan ke koleksi!</p>
            </div>

            <button className="new-pet-ok-btn" onClick={() => setShowNewPet(null)}>
              <Sparkles size={20} />
              <span>Keren!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CuteVirtualPet
