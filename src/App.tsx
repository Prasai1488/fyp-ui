import "./App.css";
import Button from "./components/Buttons/Button";

function App() {
  const handleSubmit = () => {
    alert("button clicked");
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Reusable Submit Button</h1>

        {/* Default size button */}
        <Button label="Default Button"  onClick={handleSubmit} />

      </div>
    </>
  );
}

export default App;
