import React from 'react';
import Navbar from './Navbar';
import ActionButtonGrid from './ActionButtonGrid';

const CoursePage = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <CourseDescription />
      <ActionButtonGrid />
      <footer className="text-center py-4 border-t border-gray-700">
        <p>Contact us</p>
      </footer>
    </div>
  );
};

// Course Description Component
const CourseDescription = () => (
  <section className="p-6 md:p-12">
    <h2 className="text-xl md:text-3xl font-bold mb-2">
      SWE 206 - Introduction to Software Engineering (2-3-3)
    </h2>
    <p className="text-gray-300 mb-4 text-sm md:text-base">
      Introduction to software engineering discipline, software process, requirements analysis and design models. Understanding of ethical and professional issues of software engineering discipline.
    </p>
    <p className="text-sm md:text-base">
      Pre-requisites: <a href="#ICS108" className="text-indigo-400 underline">ICS108</a>
    </p>
  </section>
);

export default CoursePage;
