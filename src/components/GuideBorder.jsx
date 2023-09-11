import React from 'react'
import './GuideBorder.css'
import data from '../data/data.json'

function GuideBorder() {
  const borderArray = []
  // const tileWidth = 10
  // const tileHeight = 8

  for (let index = 0; index < data.border.length; index++) {
    borderArray.push(<div key={index} className='GuideBorder' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * (${data.border[index][0]} + 4))`,
      top: `calc(var(--tile-size) * (${data.border[index][1] * -1} + 3))`,
    }}></div>)
  }

  return (
    <div>{borderArray}</div>
  )
}

export default GuideBorder