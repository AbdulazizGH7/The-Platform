import React, { useContext, useEffect, useState } from 'react';
import { CourseEvaluationContext } from './CourseEvaluationContext';
import ExperienceItem from './ExperienceItems';
import axios from 'axios';

const ExperienceList = ({ courseId }) => {
  const { experiences, setExperiences } = useContext(CourseEvaluationContext);
  const [error, setError] = useState(null);

  // Fetch experiences for the courseId if it's not already in the context
  useEffect(() => {
    if (!experiences || experiences.length === 0) {
      axios.get(`http://localhost:8080/api/courses/${courseId}/experiences`)
        .then((response) => {
          setExperiences(response.data);  // Populate experiences specific to this course
        })
        .catch((err) => {
          console.error('Error fetching experiences:', err);
          setError('Failed to fetch experiences');
        });
    }
  }, [courseId, experiences, setExperiences]);

  const deleteExperience = (experienceId) => {
    // Call the API to delete the experience directly by its ID
    axios.delete(`http://localhost:8080/api/experiences/${experienceId}`)
      .then(() => {
        setExperiences(prev => prev.filter(exp => exp._id !== experienceId));
      })
      .catch((err) => {
        console.error('Error deleting experience:', err);
        alert('Failed to delete experience');
      });
  };

  if (!experiences) {
    return <p className="text-white">Loading experiences...</p>;
  }

  return (
    <div className="w-full md:w-2/3 rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4 md:p-6 border-4 border-white">
        Experiences
      </h2>
      <div className="overflow-y-auto max-h-80 md:max-h-96 space-y-4 p-5 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg border-4 border-white">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience._id}
            experienceId={experience._id}
            description={experience.description}
            metrics={experience.metrics}
            onDelete={deleteExperience}  // Pass the delete function
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
