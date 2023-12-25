import React, { Suspense, lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ProtectedRoute from "./util/ProtectedRoute";
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
          <ProtectedRoute>
            <Suspense>
              <AdminPage />
            </Suspense>
          </ProtectedRoute>
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
          if (localStorage.getItem("token") !== null) {
            return redirect("/admin");
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
        element: (
          <ProtectedRoute>
              <EmployeeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
