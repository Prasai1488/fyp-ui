import "./App.css";
import Button from "./components/Buttons/Button";
import Login from "./pages/Login/Login";

function App() {
  const handleSubmit = () => {
    alert("button clicked");
  };

  return (
    <>
     <Login/>
    </>
  );
}

export default App;
