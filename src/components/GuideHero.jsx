import React from 'react'
import './GuideHero.css'

function GuideHero() {
  return (
    <div className='GuideHero' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * 4)`,
      top: `calc((var(--tile-size) * 4) - (var(--tile-size) * 1))`,
    }}></div>
  )
}

export default GuideHero