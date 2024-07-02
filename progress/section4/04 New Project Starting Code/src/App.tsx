import Input from "./components/Input.tsx";
import Form, { type FormHandle } from "./components/Form.tsx";
import Button from "./components/Button.tsx";
import { useRef } from "react";

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: string }; // convert type to another type; use when we knows better than ts
    console.log(extractedData);
    customForm.current?.clear();
  }

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        <Input type="text" label="Name" id="name" />
        <Input type="number" label="Age" id="age" />
        <Button type="submit">Save</Button>
      </Form>
    </main>
  );
}

export default App;
