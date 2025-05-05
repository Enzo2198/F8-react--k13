// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Product from './pages/Product'
import Employee from './pages/Employee'
import Colors from './pages/Colors'
// import App from './App.tsx'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";


const router = createBrowserRouter([
    {
        path: "/colors",
        element: <Colors></Colors>,
    },
    {
        path: "/product",
        element: <Product></Product>,
    },
    {
        path: "/employee",
        element: <Employee/>,
    },
]);


const root = document.getElementById("root");

createRoot(root!).render(
    <RouterProvider router={router} />
)
