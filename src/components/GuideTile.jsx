import React from 'react'
import './GuideTile.css'
import data from '../data/data.json'

function GuideTile() {
  const tileArray = []

  for (let indexHeight = 0; indexHeight < data.mapSize[1]; indexHeight++) {
    for (let indexWidth = 0; indexWidth < data.mapSize[0]; indexWidth++) {
      tileArray.push(<div key={`${indexWidth} ${indexHeight}`} className='GuideTile'>
        {indexWidth - (Math.ceil(data.mapSize[0] / 2) - 1)}
        /
        {-1 * (indexHeight - (Math.ceil(data.mapSize[1] / 2) - 1))}
      </div>)
    }

    tileArray.push(<br key={`${indexHeight} br`}></br>)
  }

  return (
    <div style={{
      width: `calc(var(--tile-size) * ${data.mapSize[0]})`,
      height: `calc(var(--tile-size) * ${data.mapSize[1]})`,
    }}>{tileArray}</div>
  )
}

export default GuideTile