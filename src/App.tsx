import './App.css';
import { useDispatch } from 'react-redux';
import {
  selectCounter,
  useAppSelector,
  type CounterId,
  type DecrementAction,
  type IncrementAction,
} from './store';

function App() {
  return (
    <>
      <Counter counterId="first" />
      <Counter counterId="second" />
    </>
  );
}

const Counter = ({ counterId }: { counterId: CounterId }) => {
  const dispatch = useDispatch();
  const currentCounter = useAppSelector((state) => selectCounter(state, counterId));
  console.log(`counter updated ${counterId}`);

  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const lastCounterRef = useRef<ReturnType<typeof selectCounter>>(null);

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     const currentCounter = selectCounter(store.getState(), counterId);
  //     const lastCounter = lastCounterRef.current;
  //     if (lastCounter !== currentCounter) forceUpdate();

  //     lastCounterRef.current = currentCounter;
  //   });
  //   return unsubscribe;
  // }, []);
  // const counterState = selectCounter(store.getState(), counterId);

  return (
    <>
      counter {currentCounter?.counter}
      <button
        onClick={() =>
          dispatch({ type: 'increment', payload: { counterId } } satisfies IncrementAction)
        }
      >
        increment
      </button>
      <button
        onClick={() =>
          dispatch({ type: 'decrement', payload: { counterId } } satisfies DecrementAction)
        }
      >
        decrement
      </button>
    </>
  );
};

export default App;
