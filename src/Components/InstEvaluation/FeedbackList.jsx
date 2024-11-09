import React, { useContext } from 'react';
import { EvaluationContext } from './EvaluationContext';
import FeedbackItem from './FeedbackItems';

const FeedbackList = () => {
  const { experiences } = useContext(EvaluationContext);

  return (
    <div className="w-full md:w-3/4 space-y-6 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-6">
      <h2 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg p-4 border-2 border-white border-solid">
      Evaluations
      </h2>
      <div
        className="overflow-y-auto max-h-[600px] space-y-4 p-4 bg-gradient-to-r from-[#131044] to-[#6E429D] rounded-lg"
      >
        {experiences.map((experience, index) => (
          <FeedbackItem key={index} {...experience} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
