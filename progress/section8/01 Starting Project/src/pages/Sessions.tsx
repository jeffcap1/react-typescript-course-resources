import Button from "../components/Button.tsx";
import { SESSIONS } from "../dummy-sessions.ts"; // normally, we would probably load that from a server

export default function SessionsPage() {
  return (
    <main id="sessions-page">
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React&apos;s basics all the way up
          to a deep dive into state mechanics - we got just the right session
          for you!
        </p>
      </header>
      <div id="sessions-list">
        {SESSIONS.map((session) => (
          <article className="session-item" key={session.id}>
            <img src={session.image} alt={session.title} />
            <div className="session-data">
              <h3>{session.title}</h3>
              <p>{session.summary}</p>
              <div className="actions">
                <Button el="a" to={`/sessions/${session.id}`}>
                  View More
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
