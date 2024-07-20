import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSessionContext } from "../../store/session-context";
import Modal, { ModalHandle } from "./Modal";
import Button from "../Button";
import UpcomingSession from "../UpcomingSession";

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
        <UpcomingSession key={session.id} session={session} />
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
