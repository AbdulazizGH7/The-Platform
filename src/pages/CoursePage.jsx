import React from 'react';
import ActionButtonGrid from '../Components/ActionButtonGrid';
import CourseDescription from '../Components/CourseDescription';

const CoursePage = () => {

  return (
    <div className="min-h-screen text-white">
      
      <CourseDescription />
      <ActionButtonGrid />
      
    </div>
  );
};

export default CoursePage;
