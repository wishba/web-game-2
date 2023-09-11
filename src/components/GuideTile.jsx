import React from 'react'
import './GuideTile.css'

function GuideTile({ tileWidth, tileHeight }) {
  const tileArray = []
  // const tileWidth = 10
  // const tileHeight = 8

  for (let indexHeight = 0; indexHeight < tileHeight; indexHeight++) {
    for (let indexWidth = 0; indexWidth < tileWidth; indexWidth++) {
      tileArray.push(<div key={`${indexWidth} ${indexHeight}`} className='GuideTile'>
        {indexWidth - (Math.ceil(tileWidth / 2) - 1)}
        /
        {-1 * (indexHeight - (Math.ceil(tileHeight / 2) - 1))}
      </div>)
    }

    tileArray.push(<br key={`${indexHeight} br`}></br>)
  }

  return (
    <div className='GuideTile__container'>{tileArray}</div>
  )
}

export default GuideTile