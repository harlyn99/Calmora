import React, { createContext, useContext, useState, useEffect } from 'react'

const EnergyModeContext = createContext()

export const EnergyModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('energyMode') || 'balance'
    } catch (e) {
      return 'balance'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('energyMode', mode)
    } catch (e) {}
  }, [mode])

  return (
    <EnergyModeContext.Provider value={{ mode, setMode }}>
      {children}
    </EnergyModeContext.Provider>
  )
}

export const useEnergyMode = () => useContext(EnergyModeContext)

export default EnergyModeContext
