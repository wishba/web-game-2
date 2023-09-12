import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from './data/data.json'
import GuideBorder from './components/GuideBorder'
import GuideHero from './components/GuideHero'
import GuideTile from './components/GuideTile'
import GuideObject from './components/GuideObject'

function App() {
  // const zoomTile = 16 * 4 /** 64 */
  const tileWidth = 10
  const tileHeight = 8
  const walkingRef = useRef()
  const [coordinate, setCoordinate] = useState([0, 0])
  const [facing, setFacing] = useState('')

  function roundToNearest(number, decimalPlace) {
    const multiplier = 1 / decimalPlace;
    return Math.round(number * multiplier) / multiplier;
  }

  useEffect(() => {
    for (const border of data.border) {
      if (border[0] === roundToNearest(coordinate[0] / 64, 0.5) && border[1] === roundToNearest((coordinate[1] / 64), 0.5)) {
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
          <GuideTile tileHeight={tileHeight} tileWidth={tileWidth} />
          <GuideBorder />
          <GuideObject />

          <div className='App__hero--direction' style={{
            left: `calc(var(--tile-size) * 4 + (${roundToNearest(coordinate[0] / 64, 0.5)} * 64px))`,
            top: `calc(var(--tile-size) * 3 + (${roundToNearest(coordinate[1] / 64, 0.5)} * -64px))`,
          }}></div>
        </div>

        <div className='App__hero'>
          <GuideHero />
        </div>
      </div>

      <div className='App__controller'>
        <p>{
          coordinate[0] + '/' + coordinate[1] + ' | ' +
          roundToNearest(coordinate[0] / 64, 0.5) + '/' + roundToNearest(coordinate[1] / 64, 0.5)
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
