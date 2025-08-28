import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { decrementAction, incrementAction, selectCounter, type CounterId } from './counters.slice';
import { bindActionCreators } from '@reduxjs/toolkit';

export function Counters() {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Counter counterId="first" />
      <Counter counterId="second" />
    </div>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) => selectCounter(state, counterId));

  const actions = bindActionCreators(
    {
      incrementAction,
      decrementAction,
    },
    dispatch,
  );

  return (
    <div className="flex flex-row items-center justify-center gap-5 ">
      counter {counterState?.counter}
      <button
        onClick={() => actions.incrementAction({ counterId })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        increment
      </button>
      <button
        onClick={() => actions.decrementAction({ counterId })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        decriment
      </button>
    </div>
  );
}
