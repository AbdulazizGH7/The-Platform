import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import ResourcesTable from './ResourcesTable';
import Popup from '../Popup';

const categoryTitles = {
  "oldExams": "Old Exams",
  "notes": "Notes",
  "quizzes": "Quizzes",
  "other": "Extra"
};

function ResourcesList() {
  // Assume route: /course/:courseId/resources/:category
  const { courseId , category } = useParams();

  const [course, setCourse] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  // If you need user info (to check admin role), fetch it separately or have a global auth context
  // For now, let's just set user = null or a mock:
  const [user, setUser] = useState(null); 
  // If you have an auth endpoint, you could fetch and set the user here.
  // For demonstration, we’ll leave it as null or set it to an admin role manually:
  // setUser({ role: 'admin' }) if you want to enable deletion

  // Fetch the course data by courseId 
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`http://localhost:8080/courses/${courseId }`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
    fetchCourse();
  }, [courseId ]);

  // Fetch the resource data for the given category
  useEffect(() => {
    async function fetchCategoryResources() {
      try {
        // Assuming your backend has an endpoint like:
        // GET /resources/:courseId/:category
        const res = await axios.get(`http://localhost:8080/resources/${courseId }/${category}`);
        // The response should contain a single resource object or a 404 if not found
        // resource = { course: courseId, category: category, files: [...] }
        const resource = res.data;
        setFileList(resource.files || []);
      } catch (error) {
        console.error("Error fetching resources for category:", error);
        // If error is 404 or resource not found, set fileList to empty
        setFileList([]);
      }
    }
    fetchCategoryResources();
  }, [courseId, category]);

  const displayTitle = categoryTitles[category] || 'Resources';
  const courseID = course ? course.courseId : '';
  
  const confirmDelete = () => {
    const updatedFiles = fileList.filter(file => file.name !== fileToDelete);
    setFileList(updatedFiles);
    // If you want to also delete it from the database, call an API endpoint here.
    // For now, just update local state.
    setShowDeleteConfirmation(false);
  };

  const deleteFile = (fileName) => {
    setFileToDelete(fileName);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      <div className="w-full px-4 py-8 bg-gradient-to-b from-[#171352] to-[#7A4FBF] mt-8">
        <div className="mb-4">
          <Link to={`/course/${courseId}/resources`} className="text-blue-200 hover:underline">
            &larr; Back to {courseID} Resources
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          {courseID} {displayTitle}
        </h1>

        <div className="max-w-screen-2xl mx-auto bg-[#1a1a2e] rounded-lg shadow-lg overflow-hidden">
          {fileList.length > 0 ? (
            <div className="overflow-x-auto">
              <ResourcesTable
                files={fileList}
                onDelete={user?.role === 'admin' ? deleteFile : null}
              />
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-xl text-gray-400">No resources available.</p>
            </div>
          )}
        </div>

        {user?.role === 'admin' && (
          <Popup
            show={showDeleteConfirmation}
            title="Confirm Deletion"
            message="Are you sure you want to delete this file?"
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteConfirmation(false)}
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}
      </div>
    </>
  );
}

export default ResourcesList;
