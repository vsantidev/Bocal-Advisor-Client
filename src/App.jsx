import { useState } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./Home";
import "./App.css";
import Register from "./components/Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: "/PlayStation",
    //   element: <PlayStation />,
    // },
    // {
    //   path: "/Xbox",
    //   element: <Xbox />,
    // },
  ]);

  return (
    <>
      <Login></Login>
      <RouterProvider router={router} />
      <Register></Register>
    </>
  );
}

export default App;
