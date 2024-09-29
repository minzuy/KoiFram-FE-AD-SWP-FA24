import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/logins/login";
import RegisterPage from "./pages/registers/register";
import UserManagementPage from "./pages/user-manages-page/UserManagement";
import FishManagementPage from "./pages/fish-manages-page/FishMangement";
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
