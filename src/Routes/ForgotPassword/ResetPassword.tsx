import { useState } from "react";
import "./ResetPassword.scss";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await apiRequest.post(`/reset/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="resetPassword">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
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
          alt="Reset Password Illustration"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
