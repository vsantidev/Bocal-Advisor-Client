import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/login/login'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login></Login>
    </>
  )
}

export default App
