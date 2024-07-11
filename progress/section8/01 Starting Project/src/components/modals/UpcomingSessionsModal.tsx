import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSessionContext } from "../../store/session-context";
import Modal, { ModalHandle } from "./Modal";
import Button from "../Button";

const UpcomingSessionsModal = forwardRef<ModalHandle>(
  function UpcomingSessionsModal(_, ref) {
    const { sessions } = useSessionContext();
    const modalRef = useRef<ModalHandle>(null);

    // forces modalRef to be the forwarded ref
    useImperativeHandle(ref, () => modalRef.current!, []);

    function upcomingSessions() {
      if (sessions.length === 0) {
        return <p>No upcoming sessions</p>;
      }

      return sessions.map((session) => (
        <div key={session.id}>
          <h4>{session.title}</h4>
          <time>{session.date}</time>
        </div>
      ));
    }

    return (
      <Modal ref={modalRef}>
        <h3>Upcoming Sessions</h3>
        {upcomingSessions()}
        <Button
          el="btn"
          onClick={() => {
            console.log({ modalRef });
            if (modalRef && modalRef.current) {
              modalRef.current?.close();
            }
          }}
        >
          Close
        </Button>
      </Modal>
    );
  },
);

export default UpcomingSessionsModal;
