import { Route, Link, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage";
import CourseSearchPage from './pages/CourseSearchPage';
import LoginPageTemp from "./pages/LoginPageTemp";
import { DataProvider } from "./utilities/DataContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPageTemp />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/courseSearch" element={<CourseSearchPage />} />
        </Route>
      </>
    )
  );

  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
