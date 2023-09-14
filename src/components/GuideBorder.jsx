import React from 'react'
import './GuideBorder.css'
import data from '../data/data.json'

function GuideBorder({ mapSize }) {
  const borderArray = []

  for (let index = 0; index < data.border.length; index++) {
    borderArray.push(<div key={index} className='GuideBorder' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * (${data.border[index][0]} + ${Math.ceil(mapSize[0] / 2 - 1)}))`,
      top: `calc(var(--tile-size) * (${data.border[index][1] * -1} + ${Math.ceil(mapSize[1] / 2 - 1)}))`,
    }}></div>)
  }

  return (
    <div>{borderArray}</div>
  )
}

export default GuideBorder