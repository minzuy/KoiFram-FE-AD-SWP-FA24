import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/logins/login";
import RegisterPage from "./pages/registers/register";
import UserManagementPage from "./pages/admin-home/UserManagement";
import FishManagementPage from "./pages/admin-home/FishMangement";
import AdminHomePage from "./pages/admin-home/admin";
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
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
