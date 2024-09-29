import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/registers/register";
import UserManagementPage from "./pages/admin-pages/manage-users/UserManagement";
import FishManagementPage from "./pages/admin-pages/manage-kois/FishMangement";
import AdminHomePage from "./components/admin-dashboard/admin";
import LoginPage from "./pages/logins/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LoginPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "user-manage",
      element: <UserManagementPage />,
    },
    {
      path: "fish-manage",
      element: <FishManagementPage />,
    },
    {
      path: "admin",
      element: <AdminHomePage />,
      children: [
        {
          path: "user",
          element: <UserManagementPage />,
        },
        {
          path: "fish",
          element: <FishManagementPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
