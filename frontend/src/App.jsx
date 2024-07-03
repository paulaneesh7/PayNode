import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/send", element: <SendMoney /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
