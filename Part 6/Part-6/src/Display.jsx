import { useCounter } from './store'
const selectCounter = state => state.counter

const Display = () => {
  const counter = useCounter(selectCounter)

  return (
    <div>{counter}</div>
  )
}

export default Display;