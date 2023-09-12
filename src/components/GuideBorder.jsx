import React from 'react'
import './GuideBorder.css'
import data from '../data/data.json'

function GuideBorder({ mapWidth, mapHeight }) {
  const borderArray = []
  const centeringLeft = Math.ceil(mapWidth / 2 - 1)
  const centeringTop = Math.ceil(mapHeight / 2 - 1)

  for (let index = 0; index < data.border.length; index++) {
    borderArray.push(<div key={index} className='GuideBorder' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * (${data.border[index][0]} + ${centeringLeft}))`,
      top: `calc(var(--tile-size) * (${data.border[index][1] * -1} + ${centeringTop}))`,
    }}></div>)
  }

  return (
    <div>{borderArray}</div>
  )
}

export default GuideBorder