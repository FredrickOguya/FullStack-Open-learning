import CounterContext from "../CounterContext";
import useCounter from "../hooks/useCounter";

const Controls = () => {
  const { increment, decrement, zero } = useCounter(CounterContext)


  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls;