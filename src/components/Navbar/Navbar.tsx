
// import { useContext, useState, useEffect } from "react";
// import "./navbar.scss";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { useNotificationStore } from "../../lib/notificationStore";
// import Modal from "../Modal/Modal";
// import Login from "../../pages/Login/Login";
// import Register from "../../pages/Register/Register";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { user: currentUser } = useContext(AuthContext)!;
//   const fetch = useNotificationStore((state) => state.fetch);
//   const number = useNotificationStore((state) => state.number);

//   // Modal state
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

//   // Modal handlers
//   const openLoginModal = () => {
//     setIsRegisterModalOpen(false);
//     setIsLoginModalOpen(true);
//     setOpen(false); // Close mobile menu if open
//   };

//   const openRegisterModal = () => {
//     setIsLoginModalOpen(false);
//     setIsRegisterModalOpen(true);
//     setOpen(false); // Close mobile menu if open
//   };

//   const closeModals = () => {
//     setIsLoginModalOpen(false);
//     setIsRegisterModalOpen(false);
//   };

//   useEffect(() => {
//     if (currentUser) {
//       fetch();
//     }
//   }, [currentUser, fetch]);

//   return (
//     <>
//       <nav>
//         <div className="left">
//           <a href="/" className="logo">
//             <img
//               src="https://thumbs.dreamstime.com/b/two-crossed-kukri-knives-two-crossed-kukri-knives-traditional-nepali-machete-weapon-black-white-line-art-logo-vector-clip-art-267214934.jpg"
//               alt=""
//             />
//             <span>GorkhaHomes</span>
//           </a>
//           <a href="/">Home</a>
//           <Link to="/calculate-mortgage">Calculate-Mortgage</Link>
//           <Link to="/testimonials">Testimonials</Link>
//           {currentUser && currentUser.username === "admin" && (
//             <a href="/admin">Dashboard</a>
//           )}
//         </div>
//         <div className="right">
//           {currentUser ? (
//             <div className="user">
//               <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
//               <span>{currentUser.username}</span>
//               <Link to="/profile" className="profile">
//                 {number > 0 && <div className="notification">{number}</div>}
//                 <span>Profile</span>
//               </Link>
//             </div>
//           ) : (
//             <>
//               <button onClick={openLoginModal} className="signin-btn">
//                 Sign in
//               </button>
//               <button onClick={openRegisterModal} className="register">
//                 Sign up
//               </button>
//             </>
//           )}
//           <div className="menuIcon">
//             <img
//               src="../../../public copy/menu.png"
//               alt=""
//               onClick={() => setOpen((prev) => !prev)}
//             />
//           </div>
//           <div className={open ? "menu active" : "menu"}>
//             <a href="/">Home</a>
//             <Link to="/calculate-mortgage">Calculate-Mortgage</Link>
//             <Link to="/testimonials">Testimonials</Link>
//             {currentUser && currentUser.username === "admin" && (
//               <a href="/admin">Dashboard</a>
//             )}
//             {!currentUser && <button onClick={openLoginModal}>Sign in</button>}
//             {!currentUser && (
//               <button onClick={openRegisterModal}>Sign up</button>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Login Modal */}
//       <Modal
//         isOpen={isLoginModalOpen}
//         onClose={closeModals}
//         title="Sign In"
//         size="lg"
//       >
//         <Login onRegisterClick={openRegisterModal} />
//       </Modal>

//       {/* Register Modal */}
//       <Modal
//         isOpen={isRegisterModalOpen}
//         onClose={closeModals}
//         title="Create an Account"
//         size="lg"
//       >
//         <Register onLoginClick={openLoginModal} />
//       </Modal>
//     </>
//   );
// }

// export default Navbar;


import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user :currentUser } = useContext(AuthContext)!;
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  if (currentUser) {
    console.log("Current User Username:", currentUser.username);
  }

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img
            src="https://thumbs.dreamstime.com/b/two-crossed-kukri-knives-two-crossed-kukri-knives-traditional-nepali-machete-weapon-black-white-line-art-logo-vector-clip-art-267214934.jpg"
            alt=""
          />
          <span>GorkhaHomes</span>
        </a>
        <a href="/">Home</a>
        <Link to="/calculate-mortgage">Calculate-Mortgage</Link>
        <Link to="/testimonials">Testimonials</Link>
        {currentUser && currentUser.username === "admin" && (
          <a href="/admin">Dashboard</a>
        )}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <Link to="/calculate-mortgage">Calculate-Mortgage</Link>
          <Link to="/testimonials">Testimonials</Link>
          {currentUser && currentUser.username === "admin" && (
            <a href="/admin">Dashboard</a>
          )}
          {!currentUser && <a href="/login">Sign in</a>}
          {!currentUser && <a href="/register">Sign up</a>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
