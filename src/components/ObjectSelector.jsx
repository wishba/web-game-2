import React from 'react'
import './ObjectSelector.css'
import data from '../data/data.json'
import TileSelector from './TileSelector'

function ObjectSelector({ asset, tile, placement }) {
  const objectArray = []

  for (let index = 0; index < placement.length; index++) {
    objectArray.push(<div key={index} className='ObjectSelector' style={{
      position: 'absolute',
      left: `calc(var(--tile-size) * ${placement[index][0]})`,
      top: `calc(var(--tile-size) * -1 * ${placement[index][1]})`,
      zIndex: `${placement[index][2]}`,
    }}>
      <TileSelector asset={asset} tile={[tile[index][0], tile[index][1]]} />
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