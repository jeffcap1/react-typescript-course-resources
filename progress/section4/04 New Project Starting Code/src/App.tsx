import Button from "./components/Button";
import Container from "./components/Container";

function App() {
  return (
    <main>
      <Container as={Button} onClick={() => console.log("hello")} type="button">
        Click Me
      </Container>
    </main>
  );
}

export default App;
