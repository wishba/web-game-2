import React, { useEffect, useState } from 'react'
import './ObjectSelector.css'
import data from '../data/data.json'
import TileSelector from './TileSelector'

function ObjectSelector({ asset, heroStep, select }) {
  const objectArray = []
  const [placement, setPlacement] = useState(select.placement[1])

  useEffect(() => {
    if (select.position !== undefined) {
      for (const iterator of select.position[0]) {
        if (iterator[0] === heroStep[0] && iterator[1] === heroStep[1]) {
          setPlacement(select.placement[0])
        }
      }

      for (const iterator of select.position[1]) {
        if (iterator[0] === heroStep[0] && iterator[1] === heroStep[1]) {
          setPlacement(select.placement[1])
        }
      }
    } else {
      setPlacement(select.placement)
    }
  }, [heroStep])


  for (let index = 0; index < placement.length; index++) {
    objectArray.push(<div key={index} className='ObjectSelector' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${placement[index][0]})`,
      top: `calc(var(--tile-size) * -1 * ${placement[index][1]})`,
      zIndex: `${placement[index][2]}`,
    }}>
      <TileSelector asset={asset} tile={[select.tile[index][0], select.tile[index][1]]} />
    </div>
    )
  }

  return (
    <div style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${Math.ceil(data.mapSize[0] / 2 - 1)})`,
      top: `calc(var(--tile-size) * ${Math.ceil(data.mapSize[1] / 2 - 1)})`,
    }}>{objectArray}</div>
  )
}

export default ObjectSelector