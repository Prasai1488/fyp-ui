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


import React, { useState } from 'react';
import Modal from './components/Modal/Modal';  
import Login from './pages/Login/Login';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="container mt-5">
      <h1>Test Modal Component</h1>
      <button className="btn btn-primary" onClick={openModal}>
        Open Modal
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Log In To Your Account"
        size="lg"
      >
       <Login/>
      </Modal>
    </div>
  );
};

export default App;