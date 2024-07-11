import { useRef } from "react";
import { useParams } from "react-router-dom";

import Button from "../components/Button.tsx";
import BookSessionModal from "../components/modals/BookSessionModal.tsx";
import { ModalHandle } from "../components/modals/Modal.tsx";

import { SESSIONS } from "../dummy-sessions.ts";

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const modal = useRef<ModalHandle>(null);

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  function handleModalOpen() {
    modal.current?.open();
  }

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  return (
    <main id="session-page">
      <article>
        <header>
          <img src={loadedSession.image} alt={loadedSession.title} />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <p>
              <Button el="btn" onClick={handleModalOpen}>
                Book session
              </Button>
              <BookSessionModal ref={modal} session={loadedSession} />
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
