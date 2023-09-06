import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <div className='Hero' style={{
      position: 'absolute',
      left: `calc((var(--tile-size) * 4) + 0px)`,
      top: `calc(((var(--tile-size) * 4) - var(--tile-size) * 1) + 0px)`,
    }}></div>
  )
}

export default Hero