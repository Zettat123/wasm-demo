import React from 'react'
import styles from './App.scss'
import fuck from '../assets/math.wasm'

const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 })
const importObj = {
  env: {
    abortStackOverflow: () => {
      throw new Error('overflow')
    },
    table: new WebAssembly.Table({
      initial: 0,
      maximum: 0,
      element: 'anyfunc',
    }),
    __table_base: 0,
    memory,
    __memory_base: 1024,
    STACKTOP: 0,
    STACK_MAX: memory.buffer.byteLength,
  },
}

fetch(fuck)
  .then(res => res.arrayBuffer())
  .then(buffer => WebAssembly.compile(buffer))
  .then(module => new WebAssembly.Instance(module, importObj))
  .then(instance => {
    console.log(instance)
    const add = instance.exports._add
    console.log(add(5, 6))
  })

// import('../assets/math.wasm').then(res => {
// import('../assets/fractal.wasm').then(res => {
//   console.log(res)
//   //const instance = new WebAssembly.Instance(res)
//   //   console.log(add(1))
// })

const App = () => <div className={styles.title}>Hello World!</div>

export default App
