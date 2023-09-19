import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from './data/data.json'
import assetGrass from './assets/Grass.png'
import assetCow from './assets/Free Cow Sprites.png'
import assetPlant from './assets/Basic Grass Biom things 1.png'
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
  const [showDebug, setShowDebug] = useState('none')
  const [pressedKey, setPressedKey] = useState('')
  const [placementTree, setPlacementTree] = useState(data.object.tree.placementFront)
  const roundToNearest = (number, decimalPlace) => Math.round(number * (1 / decimalPlace)) / (1 / decimalPlace)

  useEffect(() => {
    document.addEventListener('keydown', (event) => setPressedKey(event.key))
    document.addEventListener('keyup', () => setPressedKey(''))
    if (pressedKey === '`') {
      setShowDebug(showDebug === 'none' ? 'block' : 'none')
    }
  }, [pressedKey])

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

    for (const iterator of data.object.tree.positionBack) {
      if (iterator[0] === roundToNearest(coordinate[0] / tileZoom, 0.5) && iterator[1] === roundToNearest((coordinate[1] / tileZoom), 0.5)) {
        setPlacementTree(data.object.tree.placementBack)
      }
    }

    for (const iterator of data.object.tree.positionFront) {
      if (iterator[0] === roundToNearest(coordinate[0] / tileZoom, 0.5) && iterator[1] === roundToNearest((coordinate[1] / tileZoom), 0.5)) {
        setPlacementTree(data.object.tree.placementFront)
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
    <div className='App'>
      <p className='App_debug' style={{ display: `${showDebug}` }}>{
        coordinate[0] + '/' + coordinate[1] + ' | ' +
        roundToNearest(coordinate[0] / tileZoom, 0.5) + '/' + roundToNearest(coordinate[1] / tileZoom, 0.5)
      }</p>

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
          <ObjectSelector mapSize={mapSize} asset={assetPlant} placement={placementTree} tile={data.object.tree.tile} />

          <div style={{ display: `${showDebug}` }}>
            <GuideTile mapHeight={mapSize[1]} mapWidth={mapSize[0]} />
            <GuideBorder mapSize={mapSize} />
          </div>

          <div className='App__direction' style={{
            position: 'absolute',
            left: `calc(var(--tile-size) * ${Math.ceil(mapSize[0] / 2 - 1)} + (${roundToNearest(coordinate[0] / tileZoom, 0.5)} * ${tileZoom}px))`,
            top: `calc(var(--tile-size) * ${Math.ceil(mapSize[1] / 2 - 1)} + (${roundToNearest(coordinate[1] / tileZoom, 0.5)} * -${tileZoom}px))`,
            display: `${showDebug}`,
            zIndex: '1',
          }}></div>
        </div>

        <Hero mapSize={mapSize} debug={showDebug} />
      </div>

      <div className='App__controller'>
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
