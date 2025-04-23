import "./signUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useToastStore } from "../../lib/useToastStore";

const SignUp: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const { setToast } = useToastStore();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setPasswordError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      setToast({
        message: "Registration successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 300); // Slight delay so toast shows before redirect
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
      setToast({
        message: err?.response?.data?.message || "Registration failed.",
        type: "error",
      });
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          {passwordError && <span>{passwordError}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img
          src="https://skillsewa.com/storage/1376/o.jpg"
          alt="Illustration"
        />
      </div>
    </div>
  );
};

export default SignUp;
