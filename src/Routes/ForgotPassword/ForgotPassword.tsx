import { useState } from "react";
import "./forgotPassword.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await apiRequest.post("/reset/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="forgotPassword">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <button type="submit">Submit</button>
          {message && <span>{message}</span>}
          {error && <span>{error}</span>}
          <Link to="/login">Back to login</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img
          src="https://skillsewa.com/storage/1376/o.jpg"
          alt="Forgot illustration"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
