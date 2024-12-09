// src/Components/Resources/ResourcesPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ResourcesSection from './ResourcesSection';
import ButtonGradient from '../ButtonGradient/ButtonGradient';
import UploadModal from './UploadModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotification from './ToastNotification';

const categoryTitles = {
  "oldExams": "Old Exams",
  "notes": "Notes",
  "quizzes": "Quizzes",
  "other": "Extra"
};

function ResourcesPage() {
  // Assume route is something like: /course/:courseId/resources
  // If your actual route is different, adjust accordingly.
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch course data by courseId
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(res.data); // res.data should be the course object
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }
    fetchCourse();
  }, [courseId]);

  // Fetch resources data by courseId
  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await axios.get(`http://localhost:8080/api/resources/${courseId}`);
        // res.data should be an array of resources, each with a category and files array
        setResources(res.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    }
    fetchResources();
  }, [courseId]);

  // Convert the resources array into an object keyed by category
  const resourcesByCategory = resources.reduce((acc, resource) => {
    acc[resource.category] = resource.files;
    return acc;
  }, {});

  const displayCourseName = course ? course.courseCode + ' Resources' : 'Loading...';

  // If you previously had a function to add files client-side, you may no longer need it
  // since uploads now go directly to the database.
  // If you want to reflect changes immediately after upload without refetching, you could
  // still implement a local update function here:
  const addFileToCategory = (selectedCategory, newFile) => {
    // Insert file into local state for immediate UI feedback
    setResources((prevResources) => {
      // Find the resource with this category
      const updated = [...prevResources];
      const resourceIndex = updated.findIndex(r => r.category === selectedCategory);

      if (resourceIndex !== -1) {
        updated[resourceIndex].files.push(newFile);
      } else {
        // If no resource for this category yet, create one
        updated.push({ category: selectedCategory, files: [newFile], course: course._id });
      }

      return updated;
    });

    toast.success('File uploaded successfully!');
  };

  return (
    <>
      <h1 className="text-white underline text-center font-outfit text-[clamp(1.5rem,6vw,4rem)] font-medium leading-tight tracking-normal m-6 mt-10">
        {displayCourseName}
      </h1>

      {/* Only render ResourcesSection when resources are loaded */}
      {(
        <ResourcesSection
          resources={resourcesByCategory} // Pass the object keyed by category
          categoryTitles={categoryTitles}
          courseId={courseId} // or courseId if that’s what you’re using
        />
      )}

      <div className="flex justify-center mt-8 mb-8">
        <ButtonGradient title="Upload" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <UploadModal
          closeModal={() => setIsModalOpen(false)}
          categoryTitles={categoryTitles}
          courseId={courseId}
          currentCategory={null}
        />
      )}

      <ToastNotification />
    </>
  );
}

export default ResourcesPage;
