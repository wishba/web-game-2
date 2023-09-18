import React from 'react'
import './Hero.css'
import TileSelector from './TileSelector'
import assetHero from '../assets/Basic Charakter Spritesheet.png'

function Hero({ mapSize, debug }) {
  return (
    <div className='Hero' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${Math.ceil(mapSize[0] / 2 - 1)})`,
      top: `calc(var(--tile-size) * ${Math.ceil(mapSize[1] / 2 - 1)})`,
      backgroundColor: `${debug === 'block' ? 'rgba(0, 128, 0, 0.25)' : 'transparent'}`,
    }}>
      <TileSelector asset={assetHero} tile={[1, 1]} />
    </div>
  )
}

export default Hero