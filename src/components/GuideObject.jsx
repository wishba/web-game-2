import React from 'react'
import './GuideObject.css'

function GuideObject() {
  const objectArray = []
  const objectTile = [
    [2, 1, 0],
    [2, 0, 0],
    [2, -1, 1]
  ]

  for (let index = 0; index < objectTile.length; index++) {
    objectArray.push(<div className='GuideObject__tile' style={{
      left: `calc(var(--tile-size) * ${objectTile[index][0]})`,
      top: `calc(var(--tile-size) * -1 * ${objectTile[index][1]})`,
      zIndex: `${objectTile[index][2]}`,
    }}></div>)
  }

  return (
    <div className='GuideObject'>{objectArray}</div>
  )
}

export default GuideObject