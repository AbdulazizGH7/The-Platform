import React, { useState, useEffect } from 'react';
import CourseInfo from './CourseInfo';
import ExperienceList from './ExperienceList';

function CourseEvaluationPage() {
  const [width, setWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex flex-col items-center px-4 py-6 sm:py-12 bg-gradient-to-r from-[#03002E] to-[#312E60]">
      {/* Page Title */}
      <h1 data-layername="courseEvaluation" className="self-start mt-8 sm:mt-16 ml-2 sm:ml-6 text-4xl font-bold text-center text-white max-md:mt-10 max-md:ml-2.5">
        Course Evaluation
      </h1>
      <div className="shrink-0 self-start mt-2.5 max-w-full h-0 border-2 border-white border-solid bg-zinc-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full max-w-[600px]" />

      {/* Course Information Section */}
      <section data-layername="search" className="self-stretch pb-9 mt-8 sm:mt-16 rounded-xl border border-white border-solid max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <CourseInfo width={width} />
          <ExperienceList />
        </div>
      </section>
    </main>
  );
}

export default CourseEvaluationPage;