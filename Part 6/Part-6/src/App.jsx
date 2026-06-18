import { create } from 'zustand'

const userCounterStore = create(set => ({
  counter: 0,
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  zero: () => set(() => ({counter: 0 }))
}))

const App = () => {
  const counter = userCounterStore(state => state.counter)
  const increment = userCounterStore(state => state.increment)
  const decrement = userCounterStore(state => state.decrement)
  const zero = userCounterStore(state => state.zero)

  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={increment}>plus</button>
        <button onClick={decrement}>minus</button>
        <button onClick={zero}>zero</button>
      </div>
    </div>
  )
}

export default App;