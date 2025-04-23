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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
