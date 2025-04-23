import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { useToastStore } from "../../lib/useToastStore";

function ProfileUpdatePage() {
  const { user: currentUser, updateUser } = useContext(AuthContext)!;
  if (!currentUser) {
    return <div className="profileUpdatePage">Loading user info...</div>;
  }
  const { setToast } = useToastStore();

  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { username, email, password } = Object.fromEntries(formData) as {
      username: string;
      email: string;
      password: string;
    };

    try {
      const res = await apiRequest.put(`/user/update-user/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });

      updateUser(res.data);

      setToast({
        message: "Profile updated successfully!",
        type: "success",
      });

      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong.");
      setToast({
        message: "Failed to update profile.",
        type: "error",
      });
    }
  };

  const avatarUrl = avatar[0] ?? currentUser.avatar ?? "/noavatar.jpg";

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>

          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>

          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>

          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>

          <button>Update</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>

      <div className="sideContainer">
        <img src={avatarUrl} alt="avatar" className="avatar" />

        <UploadWidget
          uwConfig={{
            cloudName: "lamadev",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
