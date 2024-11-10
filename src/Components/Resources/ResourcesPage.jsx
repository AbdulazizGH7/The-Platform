// src/Components/Resources/ResourcesPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ResourcesSection from './ResourcesSection';
import ButtonGradient from '../ButtonGradient/ButtonGradient';
import UploadModal from './UploadModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotification from './ToastNotification';
import { useData } from '../../utilities/DataContext';

const categoryTitles = {
  "oldExams": "Old Exams",
  "notes": "Notes",
  "quizzes": "Quizzes",
  "other": "Extra"
};

function ResourcesPage() {
  const { courseId } = useParams();
  const { courses } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the course by courseId
  const course = courses.find(course => course.courseId === parseInt(courseId));
  const courseName = course ? course.courseCode : 'Course Resources';

  // Function to handle adding a new file to a category
  const addFileToCategory = (selectedCategory, newFile) => {
    if (course) {
      // Append the new file to the selected category in the course's resources
      course.resources[selectedCategory].push(newFile);
      
      toast.success('File uploaded successfully!');
    }
  };

  return (
    <>
      <h1 className="text-white underline text-center font-outfit text-[clamp(1.5rem,6vw,4rem)] font-medium leading-tight tracking-normal m-6 mt-10">
        {courseName} Resources
      </h1>

      <ResourcesSection resources={course.resources} categoryTitles={categoryTitles} courseId={courseId} />

      <div className="flex justify-center mt-8 mb-8">
        <ButtonGradient title="Upload" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <UploadModal
          closeModal={() => setIsModalOpen(false)}
          addFileToCategory={addFileToCategory}
          categoryTitles={categoryTitles}
        />
      )}

      <ToastNotification />
    </>
  );
}

export default ResourcesPage;
