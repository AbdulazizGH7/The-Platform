import React, { useContext } from 'react';
import { EvaluationContext } from './EvaluationContext';
import FeedbackItem from './FeedbackItems';

const FeedbackList = () => {
  const { feedbacks, setFeedbacks } = useContext(EvaluationContext);

  const deleteFeedback = (index) => {
    setFeedbacks((prev) => prev.filter((_, i) => i !== index));
  };

  // Check if feedbacks is an array
  if (!Array.isArray(feedbacks)) {
    return <p className="text-white">Loading feedbacks...</p>;
  }

  return (
    <div className="w-full md:w-2/3 rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4 md:p-6 border-4 border-white">
        Evaluations
      </h2>
      <div
        className="overflow-y-auto max-h-80 md:max-h-96 space-y-4 p-5 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg border-4 border-white"
      >
        {feedbacks.map((feedback, index) => (
          <FeedbackItem key={index} {...feedback} onDelete={() => deleteFeedback(index)}/>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
