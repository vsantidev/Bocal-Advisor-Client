import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './Home'
import './App.css'

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
