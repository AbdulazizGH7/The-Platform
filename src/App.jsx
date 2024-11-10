import { Route, Link, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from "./pages/HomePage";
import CourseSearchPage from './pages/CourseSearchPage'
import LoginPageTemp from "./pages/LoginPageTemp";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login" replace/>}></Route>
        <Route path="/login" element={<LoginPageTemp/>}></Route>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/courseSearch" element={<CourseSearchPage/>}></Route>
        </Route>
      </>
    )
  )

  return <RouterProvider router={router}></RouterProvider>

}

export default App