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
  const { courseId, category } = useParams();

  const [course, setCourse] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const [user, setUser] = useState(null);

  // Fetch course details
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
    fetchCourse();
  }, [courseId]);
  
  // Fetch files in the category
  useEffect(() => {
    async function fetchCategoryResources() {
      try {
        const res = await axios.get(`http://localhost:8080/api/resources/${courseId}/${category}`);
        const resource = res.data;
  
        if (resource && resource.files) {
          setFileList(resource.files); // Ensure files include _id
        } else {
          setFileList([]);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        setFileList([]);
      }
    }
    fetchCategoryResources();
  }, [courseId, category]);

  const displayTitle = categoryTitles[category] || 'Resources';
  const courseID = course ? course.courseCode : '';

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/upload/${fileToDelete}`);
      setFileList((prev) => prev.filter((file) => file._id !== fileToDelete));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert('Failed to delete file. Please try again.');
    }
  };

  const deleteFile = (fileId) => {
    setFileToDelete(fileId);
    setShowDeleteConfirmation(true);
  };

  return (
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
            <ResourcesTable files={fileList} isAdmin={user?.role === 'admin'} onDelete={deleteFile} />
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
  );
}

export default ResourcesList;
