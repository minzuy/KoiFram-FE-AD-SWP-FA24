import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserManagement from "./user-manages/UserManagement.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserManagement />
    <ToastContainer />
  </StrictMode>
);
