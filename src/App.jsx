import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from './data/data.json'
import GuideBorder from './components/GuideBorder'
import GuideHero from './components/GuideHero'
import GuideTile from './components/GuideTile'

function App() {
  const zoomTile = 16 * 4
  const walkingRef = useRef()
  const [coordinate, setCoordinate] = useState([0, 0])

  useEffect(() => {
    for (const border of data.border) {
      const [x, y] = border;
      if (x * zoomTile === coordinate[0] && y * zoomTile === coordinate[1]) {
        console.log('stop!!!');
      }
    }
  }, [coordinate])


  const startWalking = (direction) => {
    walkingRef.current = setInterval(() => {
      setCoordinate(previousCoordinate => {
        switch (direction) {
          case 'right':
            return [previousCoordinate[0] + .5, previousCoordinate[1]]
          case 'left':
            return [previousCoordinate[0] - .5, previousCoordinate[1]]
          case 'down':
            return [previousCoordinate[0], previousCoordinate[1] + .5]
          case 'up':
            return [previousCoordinate[0], previousCoordinate[1] - .5]
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
          top: `calc((var(--tile-size) * 0) + (-1 * ${coordinate[1]}px))`,
        }}>
          <GuideTile />
          <GuideBorder />
        </div>

        <div className='App__hero'>
          <GuideHero />
        </div>
      </div>

      <div className='App__controller'>
        <p>{coordinate[0] + '/' + coordinate[1]}</p>

        <button
          onMouseDown={() => startWalking('up')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >up</button>

        <button
          onMouseDown={() => startWalking('left')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >left</button>

        <button
          onMouseDown={() => startWalking('right')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >right</button>

        <button
          onMouseDown={() => startWalking('down')}
          onMouseUp={stopWalking}
          onMouseLeave={stopWalking}
        >down</button>
      </div>
    </div>
  )
}

export default App
