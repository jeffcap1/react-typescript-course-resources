import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Session = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

type SessionsState = {
  sessions: Session[];
};

type SessionContextValue = SessionsState & {
  addSession: (sessionData: Session) => void;
  removeSession: () => void;
};

type SessionContextProviderProps = {
  children: ReactNode;
};

type AddSessionAction = {
  type: "ADD_SESSION";
  payload: Session;
};

type RemoveSessionAction = {
  type: "REMOVE_SESSION";
};

type Action = AddSessionAction | RemoveSessionAction;

const SessionContext = createContext<SessionContextValue | null>(null);

const initialState: SessionsState = {
  sessions: [],
};

export function useSessionContext() {
  const sessionsCtx = useContext(SessionContext);

  if (sessionsCtx === null) {
    throw new Error("SessionContext must be used within a SessionProvider");
  }

  return sessionsCtx;
}

const sessionReducer = (
  state: SessionsState,
  action: Action,
): SessionsState => {
  if (action.type === "ADD_SESSION") {
    return {
      ...state,
      sessions: [...state.sessions, action.payload],
    };
  }

  return state;
};

export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  // SessionContextValue
  const [sessionsState, dispatch] = useReducer(sessionReducer, initialState);

  const ctx: SessionContextValue = {
    sessions: sessionsState.sessions,
    addSession(sessionData: Session) {
      dispatch({ type: "ADD_SESSION", payload: sessionData });
    },
    removeSession() {
      dispatch({ type: "REMOVE_SESSION" });
    },
  };

  return (
    <SessionContext.Provider value={ctx}>{children}</SessionContext.Provider>
  );
};
