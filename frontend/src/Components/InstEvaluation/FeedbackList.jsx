// import React, { useContext } from 'react';
// import { EvaluationContext } from './EvaluationContext';
// import FeedbackItem from './FeedbackItems';
// import axios from 'axios';


// const FeedbackList = () => {
//   const { feedbacks, setFeedbacks } = useContext(EvaluationContext);

//   const deleteFeedback = (feedbackId) => {
//     console.log('Deleting feedback with ID:', feedbackId); // Log feedback ID to ensure correctness
//     axios
//       .delete(`http://localhost:8080/api/instructors/${instructorId}/deleteFeedback`, {
//         data: { feedbackId },
//       })
//       .then(() => {
//         setFeedbacks((prev) => prev.filter((feedback) => feedback._id !== feedbackId));
//       })
//       .catch((err) => {
//         console.error('Error deleting feedback:', err);
//         alert('Failed to delete feedback');
//       });
//   };
  

//   // Ensure feedbacks is an array before rendering
//   if (!Array.isArray(feedbacks)) {
//     return <p className="text-white">Loading feedbacks...</p>;
//   }

//   return (
//     <div className="w-full md:w-2/3 rounded-xl shadow-lg p-6 space-y-4">
//       <h2 className="text-2xl md:text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4 md:p-6 border-4 border-white">
//         Evaluations
//       </h2>
//       <div className="overflow-y-auto max-h-80 md:max-h-96 space-y-4 p-5 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg border-4 border-white">
//         {feedbacks.map((feedback, index) => (
//           <FeedbackItem
//             key={feedback._id} // Use _id as the key for better identification
//             feedbackId={feedback._id} // Pass feedback._id explicitly
//             instructorId={feedback.instructorId} // Pass instructorId if needed
//             review={feedback.review} // Pass other properties as needed
//             metrics={feedback.metrics} // Ensure feedback has metrics for the StarRating
//             onDelete={deleteFeedback} // Pass delete function
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// export default FeedbackList;
import React, { useContext } from 'react';
import { EvaluationContext } from './EvaluationContext';
import FeedbackItem from './FeedbackItems';
import axios from 'axios';


const FeedbackList = () => {
  const { feedbacks, setFeedbacks } = useContext(EvaluationContext);

  // Update the deleteFeedback function to accept both feedbackId and instructorId
  const deleteFeedback = (feedbackId, instructorId) => {
    console.log('Deleting feedback with ID:', feedbackId, 'Instructor ID:', instructorId);
    axios
      .delete(`http://localhost:8080/api/instructors/${instructorId}/deleteFeedback`, {
        data: { feedbackId },
      })
      .then(() => {
        setFeedbacks((prev) => prev.filter((feedback) => feedback._id !== feedbackId));
      })
      .catch((err) => {
        console.error('Error deleting feedback:', err);
        alert('Failed to delete feedback');
      });
  };

  // Ensure feedbacks is an array before rendering
  if (!Array.isArray(feedbacks)) {
    return <p className="text-white">Loading feedbacks...</p>;
  }

  return (
    <div className="w-full md:w-2/3 rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4 md:p-6 border-4 border-white">
        Evaluations
      </h2>
      <div className="overflow-y-auto max-h-80 md:max-h-96 space-y-4 p-5 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg border-4 border-white">
        {feedbacks.map((feedback, index) => (
          <FeedbackItem
            key={feedback._id} // Use _id as the key for better identification
            feedbackId={feedback._id} // Pass feedback._id explicitly
            instructorId={feedback.instructorId} // Pass instructorId if needed
            review={feedback.review} // Pass other properties as needed
            metrics={feedback.metrics} // Ensure feedback has metrics for the StarRating
            onDelete={deleteFeedback} // Pass delete function
          />
        ))}
      </div>
    </div>
  );
};


export default FeedbackList;
