import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from './data/data.json'
import assetGrass from '../src/assets/Grass.png'
import assetCow from '../src/assets/Free Cow Sprites.png'
import GuideBorder from './components/GuideBorder'
import GuideTile from './components/GuideTile'
import Hero from './components/Hero'
import ObjectSelector from './components/ObjectSelector'

function App() {
  const tileZoom = 16 * 4
  const mapSize = [8, 7]
  const walkingRef = useRef()
  const [coordinate, setCoordinate] = useState([0, 0])
  const [facing, setFacing] = useState('')

  function roundToNearest(number, decimalPlace) {
    const multiplier = 1 / decimalPlace;
    return Math.round(number * multiplier) / multiplier;
  }

  useEffect(() => {
    for (const border of data.border) {
      if (border[0] === roundToNearest(coordinate[0] / tileZoom, 0.5) && border[1] === roundToNearest((coordinate[1] / tileZoom), 0.5)) {
        setCoordinate(previousCoordinate => {
          switch (facing) {
            case 'right':
              return [previousCoordinate[0] - 1, previousCoordinate[1]]
            case 'left':
              return [previousCoordinate[0] + 1, previousCoordinate[1]]
            case 'down':
              return [previousCoordinate[0], previousCoordinate[1] + 1]
            case 'up':
              return [previousCoordinate[0], previousCoordinate[1] - 1]
          }
        })
      }
    }
  }, [coordinate])


  const startWalking = (direction) => {
    walkingRef.current = setInterval(() => {
      setCoordinate(previousCoordinate => {
        switch (direction) {
          case 'right':
            return [previousCoordinate[0] + 1, previousCoordinate[1]]
          case 'left':
            return [previousCoordinate[0] - 1, previousCoordinate[1]]
          case 'down':
            return [previousCoordinate[0], previousCoordinate[1] - 1]
          case 'up':
            return [previousCoordinate[0], previousCoordinate[1] + 1]
        }
      })
    }, 30)
  }

  const stopWalking = () => {
    clearInterval(walkingRef.current)
  }

  return (
    <div>
      <div className='App__screen' style={{
        width: `${tileZoom * mapSize[0]}px`,
        height: `${tileZoom * mapSize[1]}px`,
      }}>
        <div style={{
          position: 'absolute',
          left: `${coordinate[0] * -1}px`,
          top: `${coordinate[1]}px`,
        }}>
          <ObjectSelector mapSize={mapSize} asset={assetGrass} placement={data.object.ground.placement} tile={data.object.ground.tile} />
          <ObjectSelector mapSize={mapSize} asset={assetCow} placement={data.object.cow.placement} tile={data.object.cow.tile} />

          <GuideTile mapHeight={mapSize[1]} mapWidth={mapSize[0]} />
          <GuideBorder mapSize={mapSize} />

          <div className='App__direction' style={{
            position: 'absolute',
            left: `calc(var(--tile-size) * ${Math.ceil(mapSize[0] / 2 - 1)} + (${roundToNearest(coordinate[0] / tileZoom, 0.5)} * ${tileZoom}px))`,
            top: `calc(var(--tile-size) * ${Math.ceil(mapSize[1] / 2 - 1)} + (${roundToNearest(coordinate[1] / tileZoom, 0.5)} * -${tileZoom}px))`,
          }}></div>
        </div>

        <Hero mapSize={mapSize} />
      </div>

      <div className='App__controller'>
        <p>{
          coordinate[0] + '/' + coordinate[1] + ' | ' +
          roundToNearest(coordinate[0] / tileZoom, 0.5) + '/' + roundToNearest(coordinate[1] / tileZoom, 0.5)
        }</p>

        <button
          onMouseDown={() => {
            startWalking('up')
            setFacing('up')
          }}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >up</button>

        <button
          onMouseDown={() => {
            startWalking('left')
            setFacing('left')
          }}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >left</button>

        <button
          onMouseDown={() => {
            startWalking('right')
            setFacing('right')
          }}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >right</button>

        <button
          onMouseDown={() => {
            startWalking('down')
            setFacing('down')
          }}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >down</button>
      </div>
    </div>
  )
}

export default App
