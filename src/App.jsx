import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/logins/login";
import RegisterPage from "./pages/registers/register";
import UserManagementPage from "./pages/user-manages-page/UserManagement";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <div>Hello world!</div>,
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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
