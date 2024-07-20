import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal, { ModalHandle } from "./Modal";
import Form, { FormHandle } from "../Form";
import Button from "../Button";
import Input from "../Input";
import { Session, useSessionContext } from "../../store/session-context";

type BookSessionModalProps = {
  session: Session;
};

const BookSessionModal = forwardRef<ModalHandle, BookSessionModalProps>(
  function BookSessionModal({ session }, ref) {
    const modalRef = useRef<ModalHandle | null>(null);
    const formRef = useRef<FormHandle>(null);
    const [error, setError] = useState<string | null>(null);
    const { addSession } = useSessionContext();

    // forces modalRef to be the forwarded ref
    useImperativeHandle(ref, () => modalRef.current!, []);

    function handleFormSubmit(data: unknown) {
      const extractedData = data as { name: string; email: string };
      // normally this would be submitted to a server with the session
      console.log({ extractedData });

      try {
        addSession({
          id: session.id,
          title: session.title,
          summary: session.summary,
          date: session.date,
        });

        console.log("close!");
        formRef.current?.clear();
        modalRef.current?.close();
      } catch (error) {
        console.log("in error");
        if (typeof error === "string") {
          return setError(error);
        }

        if (!(error instanceof Error)) {
          return setError("An error occurred. Please try again.");
        }

        if ((error as Error).message === "Session already exists") {
          return setError("You have already signed up for this session.");
        }

        return setError((error as Error).message);
      }
    }

    return (
      <Modal ref={modalRef}>
        <Form onSave={handleFormSubmit} ref={formRef}>
          {error !== null && <p className="error">{error}</p>}
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
