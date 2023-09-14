import React from 'react'
import './GuideTile.css'

function GuideTile({ mapWidth, mapHeight }) {
  const tileArray = []

  for (let indexHeight = 0; indexHeight < mapHeight; indexHeight++) {
    for (let indexWidth = 0; indexWidth < mapWidth; indexWidth++) {
      tileArray.push(<div key={`${indexWidth} ${indexHeight}`} className='GuideTile'>
        {indexWidth - (Math.ceil(mapWidth / 2) - 1)}
        /
        {-1 * (indexHeight - (Math.ceil(mapHeight / 2) - 1))}
      </div>)
    }

    tileArray.push(<br key={`${indexHeight} br`}></br>)
  }

  return (
    <div style={{
      width: `calc(var(--tile-size) * ${mapWidth})`,
      height: `calc(var(--tile-size) * ${mapHeight})`,
    }}>{tileArray}</div>
  )
}

export default GuideTile