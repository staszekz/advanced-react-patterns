// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

// funkcja która wywoła wsztskie funkcje które beda do niej przekazane
function callAll(...functions) {
  return (...args) => {
    functions.forEach(fn => {
      fn && fn(...args)
    })
  }
}
function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // // 💰 {'aria-pressed': on, onClick: toggle}
  // const togglerProps = {'aria-pressed': on, onClick: toggle}
  function getTogglerProps(props) {
    const newProps = {
      'aria-pressed': on,
      ...props,
      // onClick: () => {
      //   // props.onClick && props.onClick()
      //   props.onClick?.()
      //   toggle()
      // },
      onClick: callAll(props.onClick, toggle),
    }
    return newProps
  }
  return {on, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
