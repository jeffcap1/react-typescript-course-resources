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
  removeSession: (sessionId: string) => void;
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
  payload: string;
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

  if (action.type === "REMOVE_SESSION") {
    const idx = state.sessions.findIndex((item) => item.id === action.payload);
    const newSessions = [...state.sessions];
    newSessions.splice(idx, 1);
    return {
      ...state,
      sessions: newSessions,
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
      const idx = sessionsState.sessions.findIndex((item) => item.id === sessionData.id);
      if (idx > -1) {
        throw new Error("Session already exists");
      }
      dispatch({ type: "ADD_SESSION", payload: sessionData });
    },
    removeSession(sessionId: string) {
      dispatch({ type: "REMOVE_SESSION", payload: sessionId });
    },
  };

  return (
    <SessionContext.Provider value={ctx}>{children}</SessionContext.Provider>
  );
};
