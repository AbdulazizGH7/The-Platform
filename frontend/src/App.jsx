
import { Route, Link, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/HomePage";
import CourseSearchPage from './pages/CourseSearchPage';
import LoginPage from "./pages/LoginPage";
import CoursePage from './pages/CoursePage'
import ResourcesPage from "./Components/Resources/ResourcesPage";
import ResourcesList from "./Components/Resources/ResourcesList";
import { UserProvider } from './contexts/UserContext'; 
import GroupsPage from './pages/GroupsPage'
import AnnouncementsPage from "./pages/AnnouncementsPage"
import SignUpPage from "./pages/SignUpPage";
import CourseEvaluationPage from "./pages/CourseEvaluationPage";
import EvaluationPage from "./pages/EvaluationPage";
import InstructorListPage from "./pages/InstructorListPage";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/courseSearch" element={<CourseSearchPage />} />
          <Route path="/course/:courseId" element={<CoursePage/>}/>
          <Route path="/course/:courseId/groups"element={<GroupsPage></GroupsPage>} />
          <Route path="/group/:groupId" element={<AnnouncementsPage></AnnouncementsPage>}/>
          <Route path="/course/:courseId/experiences" element={<CourseEvaluationPage/>}/>
          <Route path="/course/:courseId/instructors"element={<InstructorListPage/>}/>
          <Route path="/instructor/:instructorId" element={<EvaluationPage/>}/>
          <Route path="/course/:courseId/resources" element={<ResourcesPage />} />
          <Route path="/course/:courseId/resources/:category" element={<ResourcesList />} />
        </Route>
      </>
    )
  );

  return (
    <>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    </>
  )
}

export default App;
