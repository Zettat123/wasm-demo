import React from 'react'
import styles from './App.scss'
import wasmLoader from '../utils/wasm-utils1'

// wasmLoader.then(res => console.log(res))

wasmLoader.then(instance => {
  const fib = instance.exports._fib
  console.log(fib(40))
})

const App = () => <div className={styles.title}>Hello World!</div>

export default App
