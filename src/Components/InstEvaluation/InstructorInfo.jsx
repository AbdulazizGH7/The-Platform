import React, { useState, useContext, useEffect } from 'react';
import { EvaluationContext } from './EvaluationContext';
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

const InstructorInfo = () => {
  const { instructorId } = useParams()
  const { instructors, user } = useData();
  
   const isAdmin = user.role === 'admin';
 console.log('User:', user, 'Is Admin:', isAdmin);
  
    const instructor = instructors.find((c) => c.instructorId === Number(instructorId))

  const [isWriteFeedbackModalOpen, setIsWriteFeedbackModalOpen] = useState(false);
  const { addFeedback, feedbacks } = useContext(EvaluationContext);

  // For displaying the averages on the main page
  const [avgPersonality, setAvgPersonality] = useState(0);
  const [avgTeaching, setAvgTeaching] = useState(0);
  const [avgGrading, setAvgGrading] = useState(0);

  // For capturing user inputs in the modal
  const [personality, setPersonality] = useState(0);
  const [teaching, setTeaching] = useState(0);
  const [grading, setGrading] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [error, setError] = useState('');

  // Fetch instructor information dynamically
  useEffect(() => {
    import('../../data/instructors.json')
      .then((data) => {
        const instructorData = data.instructorId; 
        setInstructor(instructorData);
      })
        .catch((err) => console.error('Error loading instructor data:', err));
  }, []);

  // Calculate averages when the feedback list changes
  useEffect(() => {
    if (feedbacks && feedbacks.length > 0) {
      const totalPersonality = feedbacks.reduce((sum, fb) => sum + (fb.metrics?.Personality || 0), 0);
      const totalTeaching = feedbacks.reduce((sum, fb) => sum + (fb.metrics?.Teaching || 0), 0);
      const totalGrading = feedbacks.reduce((sum, fb) => sum + (fb.metrics?.Grading || 0), 0);

      setAvgPersonality(Math.round(totalPersonality / feedbacks.length));
      setAvgTeaching(Math.round(totalTeaching / feedbacks.length));
      setAvgGrading(Math.round(totalGrading / feedbacks.length));
    } else {
      setAvgPersonality(0);
      setAvgTeaching(0);
      setAvgGrading(0);
    }
  }, [feedbacks]);

  // Open modal and reset state
  const handleOpenModal = () => {
    setPersonality(0);
    setTeaching(0);
    setGrading(0);
    setReviewContent('');
    setError('');
    setIsWriteFeedbackModalOpen(true);
  };

  // Submit feedback
  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    // Validation: Ensure all ratings are selected
    if (personality === 0 || teaching === 0 || grading === 0) {
      setError('Please select ratings for Personality, Teaching, and Grading.');
      return;
    }

    const newFeedback = {
      metrics: {
        Personality: personality,
        Teaching: teaching,
        Grading: grading,
      },
      review: reviewContent,
    };
    addFeedback(newFeedback);
    setIsWriteFeedbackModalOpen(false);
  };

  if (!instructor) {
    return <p>Loading instructor information...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-xl w-full md:w-1/3 shadow-lg max-md:ml-0 max-md:w-full">
      {/* Instructor Image and Name */}
      <div className="w-full flex justify-center">
        <img
          src={new URL(instructor.img, import.meta.url).href}
          alt={instructor.name}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '3px solid white',
            marginBottom: '10px',
          }}
        />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-center text-white bg-gradient-to-r from-[#171352] to-[#6E429D] py-3 rounded-3xl shadow-sm">
        {instructor.name}
      </h2>

      {/* Feedback Averages */}
      <div className="flex flex-wrap sm:flex-nowrap overflow-hidden sm:overflow-visible flex-col px-8 pt-3 pb-7 mt-12 w-full rounded-3xl shadow-sm bg-gradient-to-r from-[#171352] to-[#6E429D]">
        <h3 className="self-center text-xl sm:text-2xl font-bold text-center text-white">
          Personality
        </h3>
        <StarRating count={avgPersonality} isReadOnly={true} />
        <h3 className="self-center mt-2.5 text-xl sm:text-2xl font-bold text-center text-white">
          Teaching
        </h3>
        <StarRating count={avgTeaching} isReadOnly={true} />
        <h3 className="self-center mt-2.5 text-xl sm:text-2xl font-bold text-center text-white">
          Grading
        </h3>
        <StarRating count={avgGrading} isReadOnly={true} />
      </div>

      {/* Write Feedback Button */}
      {!isAdmin && <button
        className="flex items-center gap-2 px-4 mt-10 text-xl font-bold text-white rounded-3xl bg-gradient-to-r from-[#171352] to-[#6E429D] hover:from-[#6A31C1] hover:to-[#2326FE]"
        onClick={handleOpenModal}
      >
        <img src={Create} alt="Create" className="w-10 h-10" />
        Write Feedback
      </button>}

      {/* Modal for Writing Feedback */}
      {isWriteFeedbackModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gradient-to-r from-[#171352] to-[#6E429D] p-8 rounded-3xl shadow-xl w-[95%] sm:w-[850px] border border-purple-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Write Feedback</h2>
              <button
                onClick={() => setIsWriteFeedbackModalOpen(false)}
                className="text-white text-xl border border-purple-400 rounded-full p-2 hover:bg-purple-500"
              >
                ✖
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-center font-medium mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmitFeedback}>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                  <h3 className="text-lg font-semibold text-white mb-2">Personality</h3>
                  <StarRating count={personality} setRating={setPersonality} />
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Teaching</h3>
                  <StarRating count={teaching} setRating={setTeaching} />
                  <h3 className="text-lg font-semibold text-white mt-6 mb-2">Grading</h3>
                  <StarRating count={grading} setRating={setGrading} />
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
                  onClick={() => setIsWriteFeedbackModalOpen(false)}
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

export default InstructorInfo;


