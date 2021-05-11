import React, { useState } from 'react'

import HelloComp from '_modulus/todo/components/hello'
import ToDoComp from '_modulus/todo/components/todo'
const index = () => {
  const [ Render, setRender ] = useState(true)
  const handleChangeComp = () => setRender(prev => !prev)
  return (
    <div>
      <button onClick={handleChangeComp}>Get UI</button>
      {!Render ? <ToDoComp/> : <HelloComp/>}
    </div>
  )
}

export default index
