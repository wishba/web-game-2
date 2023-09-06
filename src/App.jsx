import './App.css'
import GuideBorder from './components/GuideBorder'
import GuideTile from './components/GuideTile'
import Hero from './components/Hero'

function App() {
  return (
    <div className='App' style={{
      position: 'relative',
      left: '50vw',
      top: '50vh',
      transform: 'translate(-50%, -50%)',
    }}>
      <div style={{
        position: 'absolute',
        left: `calc(var(--tile-size) * -1)`,
        top: `calc(var(--tile-size) * 0)`,
      }}>
        <GuideTile />
        <GuideBorder />
        <Hero />
      </div>
    </div>
  )
}

export default App
