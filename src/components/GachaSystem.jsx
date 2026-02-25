import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Zap, Star, Heart, Gift, X, ChevronRight } from 'lucide-react'
import {
  GachaItems,
  getRandomItem,
  RarityColors,
  RarityLabels,
  PITY_COUNT,
  getItemsByRarity
} from '../data/gachaItems'
import './GachaSystem.css'

const GACHA_COST = 100 // Cost per pull

const GachaSystem = ({ coins, onCoinsChange, onGachaResult }) => {
  const navigate = useNavigate()
  const [pullCount, setPullCount] = useState(0)
  const [pityCounter, setPityCounter] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [pullResults, setPullResults] = useState([])
  const [pullMode, setPullMode] = useState('single') // 'single' or 'multi'
  const [animationStage, setAnimationStage] = useState('idle')

  // Load pity counter from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gachaPityCounter')
    if (saved) setPityCounter(parseInt(saved))
  }, [])

  // Save pity counter
  useEffect(() => {
    localStorage.setItem('gachaPityCounter', pityCounter.toString())
  }, [pityCounter])

  const performPull = () => {
    // Check if enough coins
    if (coins < GACHA_COST) {
      alert('Coin tidak cukup! Butuh 100 coin untuk 1x pull.')
      return false
    }

    // Deduct coins
    onCoinsChange(coins - GACHA_COST)

    // Check for pity SSR
    let item
    if (pityCounter >= PITY_COUNT - 1) {
      // Guaranteed SSR
      const ssrItems = GachaItems.filter(i => i.rarity === 'ssr')
      item = {
        ...ssrItems[Math.floor(Math.random() * ssrItems.length)],
        pullId: Date.now() + Math.random(),
        obtainedAt: new Date().toISOString()
      }
      setPityCounter(0)
    } else {
      item = getRandomItem()
      setPityCounter(prev => prev + 1)
    }

    return item
  }

  const handlePull = async () => {
    if (isPulling) return

    const cost = pullMode === 'single' ? GACHA_COST : GACHA_COST * 10
    if (coins < cost) {
      alert('Coin tidak cukup!')
      return
    }

    setIsPulling(true)
    setAnimationStage('start')

    // Play animation
    await new Promise(resolve => setTimeout(resolve, 500))
    setAnimationStage('flash')
    await new Promise(resolve => setTimeout(resolve, 800))
    setAnimationStage('reveal')

    // Get results
    const results = []
    const pullCount = pullMode === 'single' ? 1 : 10

    for (let i = 0; i < pullCount; i++) {
      const item = performPull()
      if (item) results.push(item)
    }

    setPullResults(results)
    setShowResult(true)
    setIsPulling(false)
    setAnimationStage('idle')

    // Notify parent
    if (onGachaResult) {
      onGachaResult(results)
    }

    // Save to inventory
    const existing = JSON.parse(localStorage.getItem('gachaInventory') || '[]')
    localStorage.setItem('gachaInventory', JSON.stringify([...existing, ...results]))
  }

  const handleCloseResult = () => {
    setShowResult(false)
    setPullResults([])
  }

  const canAffordSingle = coins >= GACHA_COST
  const canAffordMulti = coins >= GACHA_COST * 10

  return (
    <div className="gacha-system">
      {/* Gacha Banner */}
      <div className="gacha-banner">
        <div className="gacha-header">
          <div className="gacha-title">
            <Sparkles className="gacha-icon" />
            <h2>Gacha Calmora</h2>
          </div>
          <div className="pity-counter">
            <Star className="star-icon" />
            <span>SSR dalam {PITY_COUNT - pityCounter} pull</span>
          </div>
        </div>

        {/* Banner Image */}
        <div className={`banner-display ${animationStage}`}>
          <div className="banner-bg"></div>
          <div className="banner-stars">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="banner-star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          <div className="banner-featured">
            <div className="featured-item ssr">
              <Gift size={64} />
              <span>SSR Rate UP!</span>
            </div>
          </div>
        </div>

        {/* Rates Info */}
        <div className="rates-info">
          <div className="rate-item common">
            <span className="rate-label">COMMON</span>
            <span className="rate-value">55%</span>
            <span className="rate-count">{getItemsByRarity('common').length} items</span>
          </div>
          <div className="rate-item rare">
            <span className="rate-label">RARE</span>
            <span className="rate-value">30%</span>
            <span className="rate-count">{getItemsByRarity('rare').length} items</span>
          </div>
          <div className="rate-item sr">
            <span className="rate-label">SR</span>
            <span className="rate-value">12%</span>
            <span className="rate-count">{getItemsByRarity('sr').length} items</span>
          </div>
          <div className="rate-item ssr">
            <span className="rate-label">SSR</span>
            <span className="rate-value">3%</span>
            <span className="rate-count">{getItemsByRarity('ssr').length} items</span>
          </div>
        </div>

        {/* Pull Controls */}
        <div className="pull-controls">
          <div className="pull-mode-toggle">
            <button 
              className={`mode-btn ${pullMode === 'single' ? 'active' : ''}`}
              onClick={() => setPullMode('single')}
            >
              1x Pull
            </button>
            <button 
              className={`mode-btn ${pullMode === 'multi' ? 'active' : ''}`}
              onClick={() => setPullMode('multi')}
            >
              10x Pull
            </button>
          </div>

          <div className="pull-buttons">
            <button 
              className="pull-btn single"
              onClick={handlePull}
              disabled={isPulling || !canAffordSingle}
            >
              <Zap size={20} />
              <span>{GACHA_COST} Coin</span>
            </button>
            
            <button 
              className="pull-btn multi"
              onClick={handlePull}
              disabled={isPulling || !canAffordMulti}
            >
              <Gift size={20} />
              <span>{GACHA_COST * 10} Coin</span>
            </button>
          </div>

          <div className="coin-display">
            <span>Saldo: </span>
            <span className="coin-amount">{coins}</span>
            <span> Coin</span>
          </div>
        </div>
      </div>

      {/* Pull Animation Overlay */}
      {isPulling && (
        <div className="pull-animation-overlay">
          <div className={`animation-content ${animationStage}`}>
            <div className="flash-effect"></div>
            <div className="stars-burst">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className="burst-star"
                  style={{
                    '--i': i,
                    '--angle': `${(i / 30) * 360}deg`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && (
        <div className="result-modal">
          <div className="result-overlay" onClick={handleCloseResult}></div>
          <div className="result-content">
            <button className="close-btn" onClick={handleCloseResult}>
              <X size={24} />
            </button>

            <h3 className="result-title">
              🎉 {pullResults.length === 1 ? 'Item Didapat!' : `${pullResults.length} Item Didapat!`}
            </h3>
            
            {/* SSR Highlight */}
            {pullResults.some(r => r.rarity === 'ssr') && (
              <div className="ssr-congrats">
                <Star size={24} fill="#f59e0b" stroke="#f59e0b" />
                <span>LEGENDARY ITEM!</span>
                <Star size={24} fill="#f59e0b" stroke="#f59e0b" />
              </div>
            )}

            <div className="results-grid">
              {pullResults.map((result, index) => (
                <div
                  key={result.pullId} 
                  className={`result-card ${result.rarity}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-rarity">
                    {result.rarity === 'ssr' && <Star size={16} />}
                    {result.rarity === 'sr' && <Heart size={16} />}
                    {result.rarity === 'rare' && <Zap size={16} />}
                    {result.rarity === 'common' && <Sparkles size={16} />}
                  </div>
                  <div className="card-emoji">{result.emoji}</div>
                  <div className="card-name">{result.name}</div>
                  <div className="card-type">{result.type}</div>
                  <div 
                    className="card-rarity-label"
                    style={{ backgroundColor: RarityColors[result.rarity].bg }}
                  >
                    {RarityLabels[result.rarity]}
                  </div>
                </div>
              ))}
            </div>

            <button className="claim-btn" onClick={handleCloseResult}>
              Ambil Semua <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GachaSystem
