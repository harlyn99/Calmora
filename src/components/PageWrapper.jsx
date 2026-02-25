import React from 'react'
import './PageWrapper.css'

export default function PageWrapper({ children, sticker }) {
  return (
    <div className="page-wrapper">
      {sticker && (
        <div className="page-sticker" aria-hidden>
          <span className="sticker-content">{sticker}</span>
        </div>
      )}
      <div className="page-inner">
        {children}
      </div>
    </div>
  )
}
