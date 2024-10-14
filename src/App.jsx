import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserManagementPage from "./pages/admin-pages/manage-users/UserManagement";
import AdminHomePage from "./components/admin-dashboard/admin";
import LoginPage from "./pages/logins/login";
import OrderPage from "./pages/admin-pages/manage-order/Order";
import AccountPage from "./pages/admin-pages/manage-account/account";
import FishManagementV2 from "./pages/admin-pages/manage-kois/home-page/FishV2";
import ViewFeedbackPage from "./pages/admin-pages/manage-feedback/Feedback";
import FishManagementPage from "./pages/admin-pages/manage-kois/admin-home/FishMangement";
import DeliverCompany from "./pages/admin-pages/deliver-company/deliver";

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
          path: "fish2",
          element: <FishManagementV2 />,
        },
        {
          path: "order",
          element: <OrderPage />,
        },
        {
          path: "feedback",
          element: <ViewFeedbackPage />,
        },
        {
          path: "account",
          element: <AccountPage />,
        },
        {
          path: "delivery",
          element: <DeliverCompany />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
