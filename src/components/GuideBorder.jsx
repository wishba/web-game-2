import React from 'react'
import './GuideBorder.css'

function GuideBorder() {
  const borderArray = []
  const placement = [
    [-1, -1], [-0.5, -1], [0, -1], [0.5, -1], [1, -1], [1.5, -1],
    [-1, -0.5], /**                                      */[1.5, -0.5],
    [-1, 0], /**                                            */[1.5, 0],
    [-1, 0.5], /**                                        */[1.5, 0.5],
    [-1, 1], /**                                            */[1.5, 1],
    [-1, 1.5], [-0.5, 1.5], [0, 1.5], [0.5, 1.5], [1, 1.5], [1.5, 1.5],
  ]

  for (let index = 0; index < placement.length; index++) {
    borderArray.push(<div key={index} className='GuideBorder' style={{
      position: 'absolute',
      left: `calc((var(--tile-size) * 4) + (var(--tile-size) * ${placement[index][0]}))`,
      top: `calc((var(--tile-size) * 4) + (var(--tile-size) * ${(placement[index][1]) - 1}))`,
    }}></div>)
  }

  return (
    <div>{borderArray}</div>
  )
}

export default GuideBorder