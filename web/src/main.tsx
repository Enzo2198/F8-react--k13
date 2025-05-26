// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Product from './pages/Product'
import Employee from './pages/Employee'
import Colors from './pages/Colors'
import TodoList from "./pages/TodoList"
import QuizApp from './pages/QuizApp'
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
    {
        path: "/list",
        element: <TodoList/>,
    },
    {
        path: "/quizApp",
        element: <QuizApp/>,
    },

]);


const root = document.getElementById("root");

createRoot(root!).render(
    <RouterProvider router={router} />
)
