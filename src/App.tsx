import HomePage from "./Routes/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./Routes/Layout/Layout";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";
import ListPage from "./Routes/ListPage/ListPage";
import SinglePage from "./pages/SinglePage/SinglePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignIn from "./pages/SignIn/SignIn";
import NewPostPage from "./Routes/NewPostPage/NewPostPage";
import ProfileUpdatePage from "./Routes/ProfileUpdatePage/ProfileUpdatePage";
import EditPostPage from "./Routes/EditPostPage/EditPostPage";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "./Routes/AdminDashboard/AdminDashboard";
import AdminGetPosts from "./Routes/AdminDashboard/AdminGetPosts";
import AdminPendingPosts from "./Routes/AdminDashboard/AdminPendingPosts";
import AdminLayout from "./Routes/Layout/AdminLayout";
import AdminUsers from "./Routes/AdminDashboard/AdminUsers";
import Testimonials from "./Routes/Testimonials/Testimonials";
import AddTestimonial from "./Routes/Testimonials/AddTestimonials";
import AdminPendingTestimonials from "./Routes/AdminDashboard/AdminPendingTestimonials";
import AdminGetTestimonials from "./Routes/AdminDashboard/AdminGetTestimonials";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import ForgotPassword from "./Routes/ForgotPassword/ForgotPassword";
import ResetPassword from "./Routes/ForgotPassword/ResetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <SignIn />,
        },
        {
          path: "/register",
          element: <SignUp />,
        },
        {
          path: "/testimonials",
          element: <Testimonials />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/edit/:id",
          element: <EditPostPage />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add-testimonial",
          element: <AddTestimonial />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "users", element: <AdminUsers /> },
        { path: "posts", element: <AdminGetPosts /> },
        { path: "pending-posts", element: <AdminPendingPosts /> },
        { path: "pending-testimonials", element: <AdminPendingTestimonials /> },
        { path: "testimonials", element: <AdminGetTestimonials /> },
        { path: "profile", element: <AdminProfile /> },

        // { path: "edit-posts", element: <EditPosts /> },
        // { path: "deleted-posts", element: <DeletedPosts /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
