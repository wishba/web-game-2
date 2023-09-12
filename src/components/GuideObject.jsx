import React from 'react'
import './GuideObject.css'

function GuideObject({ mapWidth, mapHeight }) {
  const objectArray = []
  const objectTile = [
    [2, 1, 0],
    [2, 0, 0],
    [2, -1, 1]
  ]
  const centeringLeft = Math.ceil(mapWidth / 2 - 1)
  const centeringTop = Math.ceil(mapHeight / 2 - 1)

  for (const tile of objectTile) {
    objectArray.push(<div key={tile} className='GuideObject' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${tile[0]})`,
      top: `calc(var(--tile-size) * -1 * ${tile[1]})`,
      zIndex: `${tile[2]}`,
    }}></div>
    )
  }

  return (
    <div style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${centeringLeft})`,
      top: `calc(var(--tile-size) * ${centeringTop})`,
    }}>{objectArray}</div>
  )
}

export default GuideObject