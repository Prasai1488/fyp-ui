import Chat from "../../components/Chat/Chat";
import List from "../../components/List/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostItem } from "../../types/PropertyTypes";
import { useToastStore } from "../../lib/useToastStore";

function ProfilePage() {
  const data = useLoaderData() as {
    postResponse: Promise<{
      data: {
        approvedPosts: PostItem[];
        pendingPosts: PostItem[];
        rejectedPosts: PostItem[];
        savedPosts: PostItem[];
      };
    }>;
    chatResponse: Promise<{
      data: {
        chats: any[]; // You can replace `any` with your real Chat type if available
      };
    }>;
  };

  const { updateUser, user: currentUser } = useContext(AuthContext)!;

  const navigate = useNavigate();

  const { setToast } = useToastStore();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");

      // ✅ 2. Set logout success message
      setToast({
        message: "You have been logged out successfully.",
        type: "info",
      });

      updateUser(null);

      // ✅ 3. Optional: add a short delay so toast appears before redirect
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (err) {
      console.log(err);
      setToast({
        message: "Logout failed. Please try again.",
        type: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await apiRequest.delete(`/users/${currentUser.id}`);
        updateUser(null);
        window.alert("Account deleted successfully");
        navigate("/login");
      } catch (err) {
        console.log("Failed to delete account", err);
      }
    }
  };

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
            <button
              onClick={handleDeleteAccount}
              style={{ marginLeft: "10px" }}
            >
              Delete Profile
            </button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => {
                const { approvedPosts, pendingPosts, rejectedPosts } =
                  postResponse.data;
                return (
                  <>
                    <div className="title">
                      <h1>✅ Approved Posts</h1>
                    </div>
                    <List posts={approvedPosts} />

                    <div className="title">
                      <h1>⏳ Pending Posts</h1>
                    </div>
                    <List posts={pendingPosts} />

                    <div className="title">
                      <h1>❌ Rejected Posts</h1>
                    </div>
                    <List posts={rejectedPosts} />
                  </>
                );
              }}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
