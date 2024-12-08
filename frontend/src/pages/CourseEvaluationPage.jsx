import React, { useState, useEffect } from 'react';
import CourseInfo from '../Components/CourseEvaluation/CourseInfo';
import ExperienceList from '../Components/CourseEvaluation/ExperienceList';
import CourseEvaluationProvider from '../Components/CourseEvaluation/CourseEvaluationContext';

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
    <main className="flex flex-col items-center px-4 py-8 sm:px-8 sm:py-12">
      <CourseEvaluationProvider>
        {/* Page Title */}
        <h1
          data-layername="courseEvaluation"
          className="self-start mt-8 sm:mt-16 ml-2 sm:ml-6 text-4xl font-bold text-center text-white max-md:mt-10 max-md:ml-2.5"
        >
          Course Evaluation
        </h1>
        <div className="shrink-0 self-start mt-4 w-full h-0 border border-white border-solid bg-zinc-300 shadow-md" />

        {/* Course Information Section */}
        <section
          data-layername="search"
          className="self-stretch pb-4 mt-4 sm:mt-8 rounded-xl border-2 border-white border-solid max-md:pl-4 max-md:mt-6 max-md:max-w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <CourseInfo width={width} />
            <ExperienceList />
          </div>
        </section>
      </CourseEvaluationProvider>
    </main>
  );
}

export default CourseEvaluationPage;
