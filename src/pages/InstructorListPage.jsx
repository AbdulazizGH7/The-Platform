import React from "react";
import { useData } from "../utilities/DataContext";
import { useParams, useNavigate } from "react-router-dom";

const InstructorListPage = () => {
  const { instructors } = useData(); // Get all instructors
  const { courseId } = useParams(); // Get the current course ID from the URL
  const navigate = useNavigate(); // React Router's navigation function

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return (
      reviews.reduce((acc, review) => {
        const metrics = review.metrics;
        const avgMetrics =
          (metrics.Personality + metrics.Teaching + metrics.Grading) / 3;
        return acc + avgMetrics;
      }, 0) / reviews.length
    );
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const InstructorCard = ({ instructor }) => {
    const averageRating = calculateAverageRating(instructor.reviews);
    const handleNavigate = () => {
      navigate(`/instructor/${instructor.instructorId}`);
    };
    const imagePath = `${import.meta.env.BASE_URL}${instructor.img.replace("../../", "src/")}`;


    return (
      <button
        onClick={handleNavigate}
        className="flex flex-col sm:flex-row items-center bg-purple-900/50 rounded-xl p-4 sm:p-6 shadow-lg border border-purple-500/30 w-full text-left hover:shadow-xl transition-shadow duration-300"
      >
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-purple-800 flex-shrink-0">
          <img
            src={imagePath}
            alt={`${instructor.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
            {instructor.name}
          </h3>
          <RatingStars rating={averageRating} />
        </div>
      </button>
    );
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.courses.includes(parseInt(courseId))
  );

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="pt-8 text-center">
        <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
          Instructors
        </h2>
        <hr className="w-1/2 mx-auto border-purple-500 mb-8" />
      </header>

      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto bg-purple-900/20 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.length > 0 ? (
              filteredInstructors.map((instructor) => (
                <InstructorCard
                  key={instructor.instructorId}
                  instructor={instructor}
                />
              ))
            ) : (
              <p className="text-white text-center">
                No instructors are assigned to this course.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorListPage;
