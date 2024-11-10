import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from "./pages/HomePage";
import CourseSearchPage from './pages/CourseSearchPage'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route path="/home" element={<HomePage/>}></Route>
      <Route path="/courseSearch" element={<CourseSearchPage/>}></Route>
    </Route>
    )
  )
  

  return <RouterProvider router={router}></RouterProvider>
}

export default App