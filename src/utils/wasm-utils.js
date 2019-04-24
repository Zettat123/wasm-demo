import fibonacci from '../assets/fibonacci.wasm'

const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 })
const importObj = {
  env: {
    abortStackOverflow: () => {
      throw new Error('overflow')
    },
    table: new WebAssembly.Table({
      initial: 0,
      maximum: 0,
      element: 'anyfunc'
    }),
    __table_base: 0,
    memory,
    __memory_base: 1024,
    STACKTOP: 0,
    STACK_MAX: memory.buffer.byteLength
  }
}

export default fetch(fibonacci)
  .then(res => res.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer, importObj))
// .then(module => new WebAssembly.Instance(module, importObj))
// .then(instance => {
//   const fib = instance.exports._fib
//   console.log(fib(45))
// })
