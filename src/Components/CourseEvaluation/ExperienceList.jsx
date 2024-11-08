import React, { useContext } from 'react';
import { CourseEvaluationContext } from './CourseEvaluationContext';
import ExperienceItem from './ExperienceItems';

const ExperienceList = () => {
  const { experiences } = useContext(CourseEvaluationContext);

  return (
    <div className="w-full md:w-3/4 space-y-6">
      <h2 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4">
        Experiences
      </h2>
      <div
        className="overflow-y-auto max-h-96 space-y-4 p-4 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg"
      >
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} {...experience} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;





