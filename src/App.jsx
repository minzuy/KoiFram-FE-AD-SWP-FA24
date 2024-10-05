import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/registers/register";
import UserManagementPage from "./pages/admin-pages/manage-users/UserManagement";
import FishManagementPage from "./pages/admin-pages/manage-kois/FishMangement";
import AdminHomePage from "./components/admin-dashboard/admin";
import LoginPage from "./pages/logins/login";
import OrderPage from "./pages/admin-pages/manage-order/Order";
import Test from "./test";

function App() {
  const router = createBrowserRouter([
    {
      path: "test",
      element: <Test />,
    },
    {
      path: "",
      element: <LoginPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
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
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "order",
          element: <OrderPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
