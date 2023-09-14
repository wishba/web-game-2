import React from 'react'
import './TileSelector.css'

function TileSelector({ asset, tile }) {
  return (
    <div className='TileSelector'>
      <img className='TileSelector__image' style={{
        transform: `scale(var(--tile-zoom)) translate(calc(var(--tile-size) * -${tile[0]} / var(--tile-zoom)), calc(var(--tile-size) * -${tile[1]} / var(--tile-zoom)))`,
      }} src={asset} />
    </div>
  )
}

export default TileSelector