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
import { useEffect } from "react";
import useDarkMode from "./shared/hooks/useDarkMode";
import ProtectedRoute from "./shared/UIElements/protectedRoute/ProtectedRoute";

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
        element: (
          <ProtectedRoute role={["user"]}>
            <OrderHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role={["admin", "test-admin"]}>
            <AdminPage />
          </ProtectedRoute>
        ),

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
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return <RouterProvider router={router} />;
}

export default App;
