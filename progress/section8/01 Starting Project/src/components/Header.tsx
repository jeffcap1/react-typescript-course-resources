import { useRef } from "react";
import Button from "./Button";
import { ModalHandle } from "./modals/Modal";
import { useSessionContext } from "../store/session-context";
import UpcomingSessionsModal from "./modals/UpcomingSessionsModal";

export default function Header() {
  const modal = useRef<ModalHandle>(null);
  const { sessions } = useSessionContext();

  console.log(sessions);

  function handleModalOpen() {
    modal.current?.open();
  }

  return (
    <div id="main-header">
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <li>
            <Button el="a" to="/" textOnly={true}>
              Our Mission
            </Button>
          </li>
          <li>
            <Button el="a" to="/sessions" textOnly={true}>
              Browse Sessions
            </Button>
          </li>
          <li>
            <Button el="btn" onClick={handleModalOpen}>
              Upcoming Sessions
            </Button>
          </li>
        </ul>
      </nav>
      <UpcomingSessionsModal ref={modal} />
    </div>
  );
}
