import React, { useContext } from 'react';
import { CourseEvaluationContext } from './CourseEvaluationContext';
import ExperienceItem from './ExperienceItems';

const ExperienceList = () => {
  const { experiences, setExperiences } = useContext(CourseEvaluationContext);

  const deleteExperience = (index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  if (!Array.isArray(experiences)) {
    return <p className="text-white">Loading experiences...</p>;
  }

  return (
    <div className="w-full md:w-2/3 rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4 md:p-6 border-4 border-white">
        Experiences
      </h2>
      <div
        className="overflow-y-auto max-h-80 md:max-h-96 space-y-4 p-5 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg border-4 border-white"
      >
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={index}
            {...experience}
            onDelete={() => deleteExperience(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
