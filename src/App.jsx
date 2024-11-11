import { Route, Link, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage";
import CourseSearchPage from './pages/CourseSearchPage';
import LoginPage from "./pages/LoginPage";
import CoursePage from './pages/CoursePage'
import ResourcesPage from "./Components/Resources/ResourcesPage";
import ResourcesList from "./Components/Resources/ResourcesList";
import { DataProvider } from "./utilities/DataContext";
import GroupsPage from './pages/GroupsPage'
import AnnouncementsPage from "./pages/AnnouncementsPage"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/courseSearch" element={<CourseSearchPage />} />
          <Route path="/course/:courseId" element={<CoursePage/>}/>
          <Route path="/course/:courseId/groups"element={<GroupsPage></GroupsPage>} />
          <Route path="/group/:groupId" element={<AnnouncementsPage></AnnouncementsPage>}/>
          <Route path="/course/:courseId/experiences"/>
          <Route path="/course/:courseId/instructors"/>
          <Route path="/instructor/:instructorId"/>
          <Route path="/course/:courseId/resources" element={<ResourcesPage />} />
          <Route path="/course/:courseId/resources/:category" element={<ResourcesList />} />
        </Route>
      </>
    )
  );

  return (
    <>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
    </>
  )
}

export default App