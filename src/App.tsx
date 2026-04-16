import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  AdminOrderPage,
  AdminPage,
  BoardMenuPage,
  BoardProductPage,
  ErrorPage,
  HomePage,
  LoginPage,
  MenuDetailPage,
  MenuPage,
  MenuProductsPage,
  OrderHistoryPage,
  RegisterPage,
} from "./pages";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/menu",
        children: [
          {
            index: true,
            element: <MenuPage />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <MenuDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: "order-history",
        element: <OrderHistoryPage />,
      },
      {
        path: "dashboard",
        element: <AdminPage />,

        children: [
          {
            path: "menus",
            element: <BoardMenuPage />,
          },
          {
            path: "products",
            children: [
              {
                index: true,
                element: <BoardProductPage />,
              },
              {
                path: ":id",
                element: <MenuProductsPage />,
              },
            ],
          },
          {
            path: "orders",
            element: <AdminOrderPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
