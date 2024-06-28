import { useRef } from "react";
import Button from "./components/Button.tsx";
import Container from "./components/Container.tsx";
import Input from "./components/Input.tsx";

function App() {
  const input = useRef<HTMLInputElement>(null);
  return (
    <main>
      <Container as={Button}>Click Me</Container>
      <Input label="Test" id="test" ref={input} />
    </main>
  );
}

export default App;
