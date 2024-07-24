import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/shop/Menu"; 
import Signup from "../components/Signup";
import UpdateProfile from "../components/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashBoardlayout from "../layout/DashBoardlayout";
import DashBoard from "../pages/dashboard/admin/DashBoard";
import Users from "../pages/dashboard/admin/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />
      },
      {
        path: "/profile",
        element: <UpdateProfile />
      },
      {
        path: "/login",
        element: <Signup />
      },
      {
        path: "/cart-page",
        element: <CartPage />
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <DashBoardlayout />,
    children: [
      { 
        path: "/dashboard",
        element: <DashBoard />
      },
      {
        path: "users",
        element: <Users />
      }
    ]
  }
]);

export default router;