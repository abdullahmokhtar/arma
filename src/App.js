import React, { Suspense, lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EmployeeDetails from "./pages/EmployeeDetails";

const AdminPage = lazy(() => import("./pages/Admin"));
const LoginPage = lazy(() => import("./pages/Login"));
const ErrorPage = lazy(() => import("./pages/Error"));

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, path: "", element: <HomePage /> },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <Suspense>
              <AdminPage />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
        loader: () => {
          if (localStorage.getItem("lll") !== null) {
            return redirect("/");
          }
          return (
            <Suspense>
              <LoginPage />
            </Suspense>
          );
        },
      },
      {
        path: "/admin/:empId",
        element: <EmployeeDetails />,
        loader: () => {
          if (localStorage.getItem("lll") === null) {
            return redirect("/login");
          } else {
            return <EmployeeDetails />;
          }
        },
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
