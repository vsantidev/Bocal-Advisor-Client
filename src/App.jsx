import React from "react";

// ==================> IMPORT NAVIGATION <==================
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Footer from "./layouts/footer/Footer";
import Page from "./components/page/Page";
// ==================> IMPORT CSS <==================
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Page/:value",
      element: <Page />,
    },
  ]);

  return (
    <>
      {/* <Login></Login> */}
      <RouterProvider router={router} />
      <Footer />
      {/* {Register()} */}
    </>
  );
}

export default App;
