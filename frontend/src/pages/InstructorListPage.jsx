import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios for API requests

const InstructorListPage = () => {
  const [instructors, setInstructors] = useState([]); // State to store fetched instructors
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const { courseId } = useParams(); // Get the current course ID from the URL
  const navigate = useNavigate(); // React Router's navigation function

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('https://the-platform-backend.onrender.com/api/instructors'); // Use correct port
        setInstructors(response.data); // Set the fetched data to state
        setLoading(false); // Set loading to false once the data is fetched
      } catch (err) {
        setError('Failed to load instructors');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchInstructors(); // Call the function to fetch data
  }, []);

  // Function to calculate average rating from reviews
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

  // RatingStars component to render star ratings
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0={.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // InstructorCard to render each instructor
  const InstructorCard = ({ instructor }) => {
    const averageRating = calculateAverageRating(instructor.reviews);
    const handleNavigate = () => {
      navigate(`/instructor/${instructor._id}`); // Use _id for navigation instead of instructorId
    };

    // Dynamically resolve image path
    const imagePath = `${import.meta.env.BASE_URL}${instructor.img.replace("../../", "src/")}`;

    return (
      <button
        onClick={handleNavigate}
        className="hover:scale-105 flex flex-col sm:flex-row items-center bg-purple-900/50 rounded-xl p-4 sm:p-6 shadow-lg border border-purple-500/30 hover:bg-purple-600  md:p-6 lg:p-8  transition-all duration-300 ease-out transform hover w-full text-left hover:shadow-xl "
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

  // Filter instructors based on courseId from the URL
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.courses.some(course => course.toString() === courseId) // Match courseId as string
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                <InstructorCard key={instructor._id} instructor={instructor} />
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
