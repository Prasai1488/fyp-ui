import { useEffect, useState, useContext } from "react";
import "./adminProfile.scss";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useToastStore } from "../../lib/useToastStore";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

const AdminProfile = () => {
  const { user: currentUser, updateUser } = useContext(AuthContext)!;
  const { setToast } = useToastStore();
  const [avatar, setAvatar] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    const fetchProfile = async () => {
      try {
        const res = await apiRequest.get(`/user/get-user/${currentUser.id}`);
        setFormData({
          email: res.data.email || "",
          username: res.data.username || "",
          fullName: res.data.fullName || "",
          phoneNumber: res.data.phoneNumber || "",
        });

        if (res.data.avatar) {
          setAvatar([res.data.avatar]);
        }
      } catch (err) {
        setToast({ message: "Failed to load profile.", type: "error" });
      }
    };

    fetchProfile();
  }, [currentUser, setToast]);

  if (!currentUser)
    return (
      <div className="loadingProfile">
        <div className="loadingSpinner"></div>
        <p>Loading profile...</p>
      </div>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!currentUser) {
      setToast({ message: "User not found.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await apiRequest.put(`/user/update-user/${currentUser.id}`, {
        ...formData,
        avatar: avatar[0],
      });
      updateUser(res.data);
      setToast({ message: "Profile updated successfully!", type: "success" });
    } catch (err: any) {
      setToast({
        message: err?.response?.data?.message || "Update failed.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="adminProfile">
      <div className="profileCard">
        <h2>Admin Profile</h2>

        <div className="profileContent">
          <div className="avatarSection">
            <div className="avatarContainer">
              <img
                src={avatar[0] ?? "/noavatar.jpg"}
                alt="admin-avatar"
                className="avatar"
              />
            </div>
            <div className="uploadButton">
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

          <form onSubmit={handleSubmit} className="profileForm">
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>

            <button
              type="submit"
              className={isSubmitting ? "submitting" : ""}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
