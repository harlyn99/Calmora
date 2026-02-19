import React, { useState, useEffect } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'
import './InspirationalQuotes.css'

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", author: "Roy T. Bennett" },
  { text: "I learned that courage was not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
  { text: "Everything has beauty, but not everyone can see.", author: "Confucius" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Great things never came from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" }
]

// Aesthetic decorative element
const getAestheticDeco = () => {
  const decos = ['✦', '◇', '○', '△', '⋆', '⟡', '✧', '◈']
  return decos[Math.floor(Math.random() * decos.length)]
}

export const InspirationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(() => {
    const saved = localStorage.getItem('currentQuote')
    return saved ? JSON.parse(saved) : quotes[0]
  })
  const [copied, setCopied] = useState(false)
  const [deco] = useState(() => getAestheticDeco())

  useEffect(() => {
    localStorage.setItem('currentQuote', JSON.stringify(currentQuote))
  }, [currentQuote])

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
    setCopied(false)
  }

  const copyToClipboard = () => {
    const text = `"${currentQuote.text}" - ${currentQuote.author}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="quote-card">
      <div className="quote-content">
        <span className="quote-deco">{deco}</span>
        <p className="quote-text">"{currentQuote.text}"</p>
        <p className="quote-author">— {currentQuote.author}</p>
      </div>
      <div className="quote-actions">
        <button onClick={copyToClipboard} className="quote-action-btn" title="Copy quote">
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <button onClick={getRandomQuote} className="quote-action-btn" title="New quote">
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  )
}

export default InspirationalQuotes
