import Input from "./components/Input.tsx";
import Form from "./components/Form.tsx";
import Button from "./components/Button.tsx";

function App() {
  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: string; }; // convert type to another type; use when we knows better than ts
    console.log(extractedData);
  }

  return (
    <main>
      <Form onSave={handleSave}>
        <Input type="text" label="Name" id="name" />
        <Input type="number" label="Age" id="age" />
        <Button type="submit">Save</Button>
      </Form>
    </main>
  );
}

export default App;
