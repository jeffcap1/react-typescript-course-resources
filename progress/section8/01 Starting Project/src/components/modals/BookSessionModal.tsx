import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalHandle } from "./Modal";
import Form, { FormHandle } from "../Form";
import Button from "../Button";
import Input from "../Input";
import { Session, useSessionContext } from "../../store/session-context";

type BookSessionModalProps = {
  session: Session;
}

const BookSessionModal = forwardRef<ModalHandle, BookSessionModalProps>(
  function BookSessionModal({ session } , ref) {
    const modalRef = useRef<ModalHandle | null>(null);
    const formRef = useRef<FormHandle>(null);
    const {addSession} = useSessionContext();

    // forces modalRef to be the forwarded ref
    useImperativeHandle(ref, () => modalRef.current!, []);

    function handleFormSubmit(data: unknown) {
      const extractedData = data as { name: string; email: string };
      // normally this would be submitted to a server with the session
      console.log({ extractedData });

      addSession({
        id: session.id,
        title: session.title,
        summary: session.summary,
        date: session.date,
      });

      formRef.current?.clear();
      modalRef.current?.close();
    }

    return (
      <Modal ref={modalRef}>
        <Form onSave={handleFormSubmit} ref={formRef}>
          <h3>Book Session</h3>
          <Input type="text" label="Your Name" id="name" />
          <Input type="email" label="Your Email" id="email" />
          <div className="actions">
            <Button
              el="btn"
              textOnly
              type="button"
              onClick={() => modalRef.current?.close()}
            >
              Close
            </Button>
            <Button el="btn" type="submit">
              Book Session
            </Button>
          </div>
        </Form>
      </Modal>
    );
  },
);

export default BookSessionModal;
