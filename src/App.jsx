import { useRef, useState } from 'react'
import './App.css'
import GuideBorder from './components/GuideBorder'
import GuideHero from './components/GuideHero'
import GuideTile from './components/GuideTile'

function App() {
  const walkingRef = useRef()
  const [coordinate, setCoordinate] = useState([0, 0])

  const startWalking = (direction) => {
    walkingRef.current = setInterval(() => {
      setCoordinate(previousCoordinate => {
        switch (direction) {
          case 'right':
            return [previousCoordinate[0] + 1, previousCoordinate[1]]
          case 'left':
            return [previousCoordinate[0] - 1, previousCoordinate[1]]
          case 'down':
            return [previousCoordinate[0], previousCoordinate[1] + 1]
          case 'up':
            return [previousCoordinate[0], previousCoordinate[1] - 1]
        }
      })
    }, 50)
  }

  const stopWalking = () => {
    clearInterval(walkingRef.current)
  }

  return (
    <div>
      <div className='App__screen' style={{
        position: 'relative',
        left: '50vw',
        top: '50vh',
        transform: 'translate(-50%, -50%)',
      }}>
        <div style={{
          position: 'absolute',
          left: `calc((var(--tile-size) * -1) + (-1 * ${coordinate[0]}px))`,
          top: `calc((var(--tile-size) * 0) + (-1 * ${coordinate[1]}px))`,
        }}>
          <GuideTile />
          <GuideBorder />
        </div>

        <div style={{
          position: 'absolute',
          left: `calc(var(--tile-size) * -1)`,
          top: `calc(var(--tile-size) * 0)`,
        }}>
          <GuideHero />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '0',
      }}>
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
