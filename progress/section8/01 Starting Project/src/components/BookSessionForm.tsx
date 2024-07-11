import { forwardRef, useRef } from "react";
import { ModalHandle } from "./modals/Modal";
import Form from "./Form";
import Button from "./Button";
import Input from "./Input";

const BookSessionForm = forwardRef<ModalHandle>(
  function BookSessionForm(_, ref) {
    console.log({ ref });
    const modalRef = useRef<ModalHandle | null>(null);

    function handleFormSubmit(data: unknown) {
      const extractedData = data as { name: string; email: string };
      console.log({ extractedData });
    }

    return (
      <>
        <Form onSave={handleFormSubmit} ref={modalRef}>
          <h3>Book Session</h3>
          <Input type="text" label="Your Name" id="name" />
          <Input type="email" label="Your Email" id="email" />
          <div className="actions">
            <Button
              el="btn"
              textOnly
              type="button"
              onClick={() => {
                console.log({ modalRef });
                if (modalRef && modalRef.current) {
                  modalRef.current?.close();
                }
              }}
            >
              Close
            </Button>
            <Button el="btn" type="submit">
              Book Session
            </Button>
          </div>
        </Form>
      </>
    );
  },
);

export default BookSessionForm;
