import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

type TimersContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: 'START_TIMERS';
}

type StopTimersAction = {
  type: 'STOP_TIMERS';
}

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
}

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

const TimersContext = createContext<TimersContextValue | null>(null);

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);

  if (timersCtx === null) {
    throw new Error("TimersContext is null - that should not be the case!");
  }

  return timersCtx;
}

function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === 'START_TIMERS') {
    return { ...state, isRunning: true };
  }

  if (action.type === 'STOP_TIMERS') {
    return { ...state, isRunning: false };
  }

  if (action.type === 'ADD_TIMER') {
    return { ...state, timers: [
      ...state.timers,
      {
        name: action.payload.name,
        duration: action.payload.duration,
      },
    ] };
  }

  return state;
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      // Add a new timer
      dispatch({ type: 'ADD_TIMER', payload: timerData });
    },
    startTimer() {
      // Start the timer
      dispatch({ type: 'START_TIMERS' });
    },
    stopTimer() {
      // Stop the timer
      dispatch({ type: 'STOP_TIMERS' });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
