import { Session, useSessionContext } from "../store/session-context";
import Button from "./Button";

type UpcomingSessionProps = {
  session: Session;
};

export default function UpcomingSession({ session }: UpcomingSessionProps) {
  const {removeSession} = useSessionContext();

  function handleCancel() {
    removeSession(session.id)
  }

  return (
    <div className="upcoming-session">
      <div>
        <h3>{session.title}</h3>
        <p>{session.summary}</p>
        <time dateTime={new Date(session.date).toISOString()}>
          {new Date(session.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>
      <div className="actions">
        <Button el="btn" type="button" textOnly onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
