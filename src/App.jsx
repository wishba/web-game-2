import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from './data/data.json'
import GuideBorder from './components/GuideBorder'
import GuideHero from './components/GuideHero'
import GuideTile from './components/GuideTile'
import GuideObject from './components/GuideObject'

function App() {
  const tileZoom = 16 * 4
  const mapWidth = 10
  const mapHeight = 10
  const centeringLeft = Math.ceil(mapWidth / 2 - 1)
  const centeringTop = Math.ceil(mapHeight / 2 - 1)
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
    <div className='App'>
      <div className='App__screen'>
        <div style={{
          position: 'absolute',
          left: `calc((var(--tile-size) * -1) + (-1 * ${coordinate[0]}px))`,
          top: `calc((var(--tile-size) * 0) + ${coordinate[1]}px)`,
        }}>
          <GuideTile mapHeight={mapHeight} mapWidth={mapWidth} />
          <GuideBorder mapHeight={mapHeight} mapWidth={mapWidth} />
          <GuideObject mapHeight={mapHeight} mapWidth={mapWidth} />

          <div className='App__hero--direction' style={{
            left: `calc(var(--tile-size) * ${centeringLeft} + (${roundToNearest(coordinate[0] / tileZoom, 0.5)} * ${tileZoom}px))`,
            top: `calc(var(--tile-size) * ${centeringTop} + (${roundToNearest(coordinate[1] / tileZoom, 0.5)} * -${tileZoom}px))`,
          }}></div>
        </div>

        <div className='App__hero'>
          <GuideHero mapHeight={mapHeight} mapWidth={mapWidth} />
        </div>
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
