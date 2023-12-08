import { useState } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/login/login'
import Home from './Home'
import './App.css'
import Register from './components/formulaire/register'

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

      {Register()}

    </>
  );
}

export default App;
