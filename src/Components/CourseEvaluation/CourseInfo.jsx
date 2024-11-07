import React, { useState, useContext, useEffect } from 'react';
import { CourseEvaluationContext } from './CourseEvaluationContext';
import Create from '../../assets/Images/Create.svg';

const StarRating = ({ count, setRating, isReadOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-2">
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
      difficulty,
      workload,
      resources,
      content: reviewContent,
    };
    addExperience(newExperience);
    setIsWriteExperienceModalOpen(false);
  };

  // Calculate averages when the experiences list changes
  useEffect(() => {
    if (experiences.length > 0) {
      const totalDifficulty = experiences.reduce((sum, exp) => sum + exp.difficulty, 0);
      const totalWorkload = experiences.reduce((sum, exp) => sum + exp.workload, 0);
      const totalResources = experiences.reduce((sum, exp) => sum + exp.resources, 0);

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
    <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
      <h2 data-layername="swe206" className="overflow-hidden px-16 py-3 text-2xl font-bold text-center text-white rounded-3xl shadow-sm bg-gradient-to-r from-[#171352] to-[#6E429D] max-md:px-5">
        SWE 206
      </h2>
      <div className="flex overflow-hidden flex-col px-8 pt-3 pb-7 mt-12 w-full rounded-3xl shadow-sm bg-gradient-to-r from-[#171352] to-[#6E429D] max-md:px-5 max-md:mt-10">
        <h3 data-layername="difficulty" className="self-center text-2xl font-bold text-center text-white">
          Difficulty
        </h3>
        <StarRating count={avgDifficulty} isReadOnly={true} />
        <h3 data-layername="workload" className="self-center mt-2.5 text-2xl font-bold text-center text-white">
          Workload
        </h3>
        <StarRating count={avgWorkload} isReadOnly={true} />
        <h3 data-layername="resources" className="self-center mt-2.5 text-2xl font-bold text-center text-white">
          Resources
        </h3>
        <StarRating count={avgResources} isReadOnly={true} />
      </div>
      {/* Write Experience Button */}
      <button
        className="flex overflow-hidden gap-0.5 justify-center px-4 mt-10 text-2xl font-bold text-center text-white rounded-3xl shadow-sm bg-gradient-to-r from-[#171352] to-[#6E429D]"
        onClick={handleOpenModal}
      >
        <img loading="lazy" src={Create} className="object-contain shrink-0 aspect-[1.06] w-[57px]" alt="" />
        <span>Write Experiences</span>
      </button>

      {/* Modal for Writing Experience */}
      {isWriteExperienceModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-[#2A2159] to-[#3D2F82] p-10 rounded-2xl shadow-lg w-[900px] relative border border-purple-500">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Write Experience</h2>
              <button
                onClick={() => setIsWriteExperienceModalOpen(false)}
                className="text-white text-xl border border-purple-400 rounded-full px-2 hover:bg-purple-500"
              >
                ✖
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-center font-medium mb-4">
                {error}
              </p>
            )}

            {/* Modal Content */}
            <form onSubmit={handleSubmitExperience}>
              <div className="flex gap-8">
                {/* Left Section: Ratings */}
                <div className="flex flex-col space-y-8 w-1/2">
                  <div className="p-6 rounded-lg bg-[#2C2149] border border-[#433568] shadow-inner">
                    <h3 className="text-lg font-semibold text-white mb-2">Difficulty</h3>
                    <StarRating count={difficulty} setRating={setDifficulty} />
                  </div>
                  <div className="p-6 rounded-lg bg-[#2C2149] border border-[#433568] shadow-inner">
                    <h3 className="text-lg font-semibold text-white mb-2">Workload</h3>
                    <StarRating count={workload} setRating={setWorkload} />
                  </div>
                  <div className="p-6 rounded-lg bg-[#2C2149] border border-[#433568] shadow-inner">
                    <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
                    <StarRating count={resources} setRating={setResources} />
                  </div>
                </div>

                {/* Right Section: Review */}
                <div className="w-1/2">
                  <h3 className="text-lg font-semibold text-white mb-4">Review</h3>
                  <textarea
                    id="content"
                    name="content"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    rows="12"
                    required
                    className="w-full p-6 rounded-lg border border-purple-400 bg-[#1E173C] text-white text-lg leading-relaxed placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-600 shadow-md"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setIsWriteExperienceModalOpen(false)}
                  className="bg-gradient-to-r from-[#5E4A99] to-[#806EBF] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 shadow-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#806EBF] to-[#B399F2] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 shadow-lg"
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





