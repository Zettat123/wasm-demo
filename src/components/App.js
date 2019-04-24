import React from 'react'
import styles from './App.scss'
import wasmLoader from '../utils/wasm-utils'

const dataDisplay = ({ ans, time }) => (
  <div>
    <div>{ans}</div>
    <div>{time}</div>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jsans: 0,
      jstime: 0,
      wasmans: 0,
      wasmtime: 0,
      fib: undefined,
      wasmReady: false
    }
  }

  componentDidMount() {
    wasmLoader.then(({ instance }) => {
      const fib = instance.exports._fib
      this.setState({ fib, wasmReady: true })
    })
  }

  jsfib(n) {
    if (n == 0) return 0
    else if (n == 1) return 1
    else return jsfib(n - 1) + jsfib(n - 2)
  }

  calculate() {
    const startTime = new Date().getTime()
  }

  render() {
    const { jsans, jstime, wasmans, wasmtime, fib, wasmReady } = this.state
    return (
      <div>
        <button disabled={!wasmReady}>Start</button>
      </div>
    )
  }
}

export default App
