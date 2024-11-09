import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from "./pages/HomePage";
import CourseSearchPage from './Components/CourseSearchPage'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<MainLayout></MainLayout>}>
    <Route index element={<HomePage/>}></Route>
  </Route>
  )
)

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
