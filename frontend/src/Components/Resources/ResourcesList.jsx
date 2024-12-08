import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ResourcesTable from './ResourcesTable';
import Popup from '../Popup';
import { useData } from '../../utilities/DataContext';

const categoryTitles = {
  "oldExams": "Old Exams",
  "notes": "Notes",
  "quizzes": "Quizzes",
  "other": "Extra"
};
function ResourcesList() {
  const { user, courses } = useData(); // Get user and course data from context
  const { courseId, category } = useParams();

  const currentCourse = courses.find(course => course.courseId === parseInt(courseId));
  const courseName = currentCourse ? currentCourse.courseName : 'Course Resources';
  const courseID = currentCourse ? currentCourse.courseCode : '';
  const displayTitle = categoryTitles[category] || 'Resources';

  // Verify that resources are being accessed correctly
  console.log("Current Course:", currentCourse);
  console.log("Selected Category:", category);
  console.log("Resources for Category:", currentCourse?.resources[category]);

  // Use resources directly from the course JSON data
  const [fileList, setFileList] = useState(currentCourse?.resources[category] || []);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Update fileList whenever the course or category changes
    setFileList(currentCourse?.resources[category] || []);
  }, [currentCourse, category]);

  const confirmDelete = () => {
    const updatedFiles = fileList.filter(file => file.name !== fileToDelete);
    setFileList(updatedFiles);

    currentCourse.resources[category] = updatedFiles; // Update the JSON data in memory
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
            <ResourcesTable files={fileList} onDelete={user?.role === 'admin' ? deleteFile : null} />
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
