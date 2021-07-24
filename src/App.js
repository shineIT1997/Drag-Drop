
import React, { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import '_styles/app.scss'

const App = () => {
  const [ input, setInput ] = useState(0)
  const [ items, setItems ] = useState([])
  const [ from, setFrom ] = useState(null)
  const [ to, setTo ] = useState(null)

  const MyWidget = ({ name }) => <div>{name}</div>

  const handleSubmit = () => {
    const boxes = []
    let i = 0

    while (i < input * input) {
      boxes.push({ id: 'cell-1', name: i + 1, type: 'cell' })
      i++
    }

    setItems(boxes)
  }

  const handleOnChange = (e) => {
    setInput(parseInt(e.target.value))
  }

  const handleDragEnd = () => {
    const cloneItem = [ ...items ]
    const itemFlag = cloneItem[to]

    cloneItem[to] = cloneItem[from]
    cloneItem[from] = itemFlag

    setItems(cloneItem)
    setFrom(null)
    setTo(null)
  }

  return (

    <div
      id="app"
      className="app">

      <input
        onChange={handleOnChange}
        type="number"
        value={input} />
      <button onClick={handleSubmit}>Submit</button>

      <div
        className="grid"
        style={{
          width: input * 30 || 0,
          gridTemplateColumns: `repeat(${Math.sqrt(items.length)}, auto)`
        }}>
        {items.map((item, i) => (
          <div
            className={`cell ${item.type}-${i}${i === to && to !== from ? ' to' : ''}`}
            data-index={i}
            key={item.name}
            draggable="true"
            onDragStart={e => setFrom(Number(e.currentTarget.dataset.index))}
            onDragOver={e => {
              e.preventDefault()
              setTo(Number(e.currentTarget.dataset.index))
            }}
            onDragEnd={handleDragEnd}
          >
            <MyWidget name={item.name} />
          </div>
        ))}
      </div>

    </div>

  )
}

export default () =>
  <BrowserRouter>
    <App/>
  </BrowserRouter>

