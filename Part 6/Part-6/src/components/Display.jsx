import CounterContext from "../CounterContext";
import useCounter from "../hooks/useCounter";

const Display = () => {
  const { counter } = useCounter(CounterContext)
  return <div>{counter}</div>
  
}

export default Display;