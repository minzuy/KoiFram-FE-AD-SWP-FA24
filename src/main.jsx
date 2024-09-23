import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserManagement from "./user-manages/UserManagement.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserManagement />
  </StrictMode>
);
