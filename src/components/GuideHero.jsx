import React from 'react'
import './GuideHero.css'

function GuideHero({ mapWidth, mapHeight }) {
  const centeringLeft = Math.ceil(mapWidth / 2 - 1)
  const centeringTop = Math.ceil(mapHeight / 2 - 1)

  return (
    <div className='GuideHero' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${centeringLeft})`,
      top: `calc(var(--tile-size) * ${centeringTop})`,
    }}></div>
  )
}

export default GuideHero