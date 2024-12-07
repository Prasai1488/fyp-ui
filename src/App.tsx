// // import "./App.css";
// import Button from "./components/Buttons/Button";
// import Login from "./pages/Login/Login";

// function App() {
//   const handleSubmit = () => {
//     alert("button clicked");
//   };

//   return (
//     <>
//      <Login/>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import Modal from "./components/Modal/Modal";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const toggleModal = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mt-5">
      <h1>Test Modal Component</h1>
      <button className="btn btn-primary" onClick={openModal}>
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isLogin ? "Login To Your Account" : "Create New Account"}
        size="lg"
      >
        {isLogin ? <Login onRegisterClick = {toggleModal} /> : <Register onLoginClick = {toggleModal}/>}
      </Modal>
    </div>
  );
};

export default App;
