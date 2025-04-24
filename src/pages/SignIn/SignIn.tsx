// import { useContext, useState } from "react";
// import "./signIn.scss";
// import { Link, useNavigate } from "react-router-dom";
// import apiRequest from "../../lib/apiRequest";
// import { AuthContext } from "../../context/AuthContext";
// import { useToastStore } from "../../lib/useToastStore";

// function SignIn() {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { setToast } = useToastStore();

//   const { updateUser } = useContext(AuthContext)!;

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     const formData = new FormData(e.currentTarget);
//     const username = formData.get("username") as string;
//     const password = formData.get("password") as string;

//     try {
//       const res = await apiRequest.post("/auth/login", {
//         username,
//         password,
//       });

//       updateUser(res.data);

//       if (res.data.role === "ADMIN") {
//         window.alert("There might be users posts waiting for approval.");
//         navigate("/admin");
//       } else {
//         window.alert("Login success");
//         navigate("/profile");
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Welcome back</h1>
//           <input
//             name="username"
//             required
//             minLength={3}
//             maxLength={20}
//             type="text"
//             placeholder="Username"
//           />
//           <input
//             name="password"
//             type="password"
//             required
//             placeholder="Password"
//           />
//           <button disabled={isLoading}>Login</button>
//           {error && <span>{error}</span>}
//           <Link to="/register">{"Don't"} you have an account?</Link>
//           <Link to="/forgot-password">Forgot your password?</Link>
//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="https://skillsewa.com/storage/1376/o.jpg" alt="" />
//       </div>
//     </div>
//   );
// }

// export default SignIn;

import { useContext, useState } from "react";
import "./signIn.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useToastStore } from "../../lib/useToastStore";

function SignIn() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToastStore();
  const { updateUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data);

      if (res.data.role === "ADMIN") {
        setToast({
          message: "Admin login: There might be posts waiting for approval.",
          type: "info",
        });
        navigate("/admin/dashboard");
      } else {
        setToast({
          message: "Login successful!",
          type: "success",
        });
        setTimeout(() => {
          navigate("/profile");
        }, 300);
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Login failed";
      setError(errMsg);
      setToast({
        message: errMsg,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
          <Link to="/forgot-password">Forgot your password?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="https://skillsewa.com/storage/1376/o.jpg" alt="" />
      </div>
    </div>
  );
}

export default SignIn;
