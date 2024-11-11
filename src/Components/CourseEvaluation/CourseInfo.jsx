import React, { useState, useContext, useEffect } from 'react';
import { CourseEvaluationContext } from './CourseEvaluationContext';
import Create from '../../assets/Images/Create.svg';
import { useData } from '../../utilities/DataContext';
import { useParams } from 'react-router-dom';

const StarRating = ({ count, setRating, isReadOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            onClick={!isReadOnly ? () => setRating(ratingValue) : undefined}
            onMouseEnter={!isReadOnly ? () => setHover(ratingValue) : undefined}
            onMouseLeave={!isReadOnly ? () => setHover(0) : undefined}
            className={`w-8 h-8 cursor-pointer ${
              ratingValue <= (hover || count) ? 'text-yellow-400' : 'text-gray-400'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .587l3.668 7.426 8.167 1.186-5.897 5.746 1.391 8.084-7.329-3.851-7.33 3.851 1.392-8.084-5.897-5.746 8.167-1.186z" />
          </svg>
        );
      })}
    </div>
  );
};

const CourseInfo = () => {
  const { courseId } = useParams()
    const { courses } = useData()
  
    const course = courses.find((c) => c.courseId === Number(courseId))

  const [isWriteExperienceModalOpen, setIsWriteExperienceModalOpen] = useState(false);
  const { addExperience, experiences } = useContext(CourseEvaluationContext);

  // For displaying the averages on the main page
  const [avgDifficulty, setAvgDifficulty] = useState(0);
  const [avgWorkload, setAvgWorkload] = useState(0);
  const [avgResources, setAvgResources] = useState(0);

  // For capturing user inputs in the modal
  const [difficulty, setDifficulty] = useState(0);
  const [workload, setWorkload] = useState(0);
  const [resources, setResources] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [error, setError] = useState('');

  // Open modal and reset state
  const handleOpenModal = () => {
    setDifficulty(0);
    setWorkload(0);
    setResources(0);
    setReviewContent('');
    setError('');
    setIsWriteExperienceModalOpen(true);
  };

  // Submit experience
  const handleSubmitExperience = (e) => {
    e.preventDefault();

    // Validation: Ensure all ratings are selected
    if (difficulty === 0 || workload === 0 || resources === 0) {
      setError('Please select ratings for Difficulty, Workload, and Resources.');
      return;
    }

    const newExperience = {
      metrics: {
        difficulty,
        workload,
        resources,
      },
      description: reviewContent,
    };

    addExperience(newExperience);
    setIsWriteExperienceModalOpen(false);
  };

  // Calculate averages when the experiences list changes
  useEffect(() => {
    if (experiences.length > 0) {
      const totalDifficulty = experiences.reduce(
        (sum, exp) => sum + (exp.metrics.difficulty || 0),
        0
      );
      const totalWorkload = experiences.reduce(
        (sum, exp) => sum + (exp.metrics.workload || 0),
        0
      );
      const totalResources = experiences.reduce(
        (sum, exp) => sum + (exp.metrics.resources || 0),
        0
      );

      setAvgDifficulty(Math.round(totalDifficulty / experiences.length));
      setAvgWorkload(Math.round(totalWorkload / experiences.length));
      setAvgResources(Math.round(totalResources / experiences.length));
    } else {
      setAvgDifficulty(0);
      setAvgWorkload(0);
      setAvgResources(0);
    }
  }, [experiences]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-xl w-full md:w-1/3 shadow-lg max-md:ml-0 max-md:w-full">
      <h2
        data-layername="swe206"
        className="overflow-hidden sm:overflow-visible px-16 py-3 text-xl sm:text-2xl font-bold text-center text-white rounded-3xl shadow-sm bg-gradient-to-r from-[#171352] to-[#6E429D]"
      >
        {course.courseName} {course.courseCode}
      </h2>
      <div className="flex flex-wrap sm:flex-nowrap flex-col px-8 pt-3 pb-7 mt-12 w-full rounded-3xl shadow-sm bg-gradient-to-r from-[#171352] to-[#6E429D]">
        <h3 className="self-center text-xl sm:text-2xl font-bold text-center text-white">
          Difficulty
        </h3>
        <StarRating count={avgDifficulty} isReadOnly={true} />
        <h3 className="self-center mt-2.5 text-xl sm:text-2xl font-bold text-center text-white">
          Workload
        </h3>
        <StarRating count={avgWorkload} isReadOnly={true} />
        <h3 className="self-center mt-2.5 text-xl sm:text-2xl font-bold text-center text-white">
          Resources
        </h3>
        <StarRating count={avgResources} isReadOnly={true} />
      </div>
      {/* Write Experience Button */}
      <button
        className="flex items-center gap-2 px-4 mt-10 text-xl font-bold text-white rounded-3xl bg-gradient-to-r from-[#171352] to-[#6E429D] hover:from-[#6A31C1] hover:to-[#2326FE]"
        onClick={handleOpenModal}
      >
        <img src={Create} alt="Create" className="w-10 h-10" />
        Write Experiences
      </button>

      {/* Modal for Writing Experience */}
      {isWriteExperienceModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gradient-to-r from-[#171352] to-[#6E429D] p-8 rounded-3xl shadow-xl w-[95%] sm:w-[850px] border border-purple-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Write Experience</h2>
              <button
                onClick={() => setIsWriteExperienceModalOpen(false)}
                className="text-white text-xl border border-purple-400 rounded-full p-2 hover:bg-purple-500"
              >
                ✖
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-center font-medium mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmitExperience}>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <h3 className="text-lg font-semibold text-white mb-2">Difficulty</h3>
                  <StarRating count={difficulty} setRating={setDifficulty} />
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Workload</h3>
                  <StarRating count={workload} setRating={setWorkload} />
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Resources</h3>
                  <StarRating count={resources} setRating={setResources} />
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-lg font-semibold text-white mb-2">Review</h3>
                  <textarea
                    rows="6"
                    className="w-full p-4 rounded-xl bg-[#1E173C] text-white border border-purple-400 focus:ring-purple-600"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsWriteExperienceModalOpen(false)}
                  className="px-6 py-2 text-white bg-purple-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-purple-500 rounded-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseInfo;
