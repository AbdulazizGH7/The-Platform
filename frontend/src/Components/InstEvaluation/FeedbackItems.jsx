import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { useUser } from '../../contexts/UserContext';

const FeedbackItem = ({ metrics, review, feedbackId, instructorId, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const isAdmin = user.role === 'admin';
  const handleConfirmDelete = () => {
    console.log('Instructor ID:', instructorId);  // Debug log
    console.log('Feedback ID:', feedbackId);  // Debug log

    if (!instructorId || !feedbackId) {
      setError('Feedback or Instructor ID is missing. Unable to delete feedback.');
      return;
    }

    
    onDelete(feedbackId, instructorId);  
    setIsDeleteModalOpen(false); 
    setError(null); 
  };

  return (
    <div className="flex flex-col justify-center p-1 mt-4 w-full rounded-3xl border-solid border-[3px] max-md:max-w-full">
      <div className="px-4 py-4 rounded-lg border-solid border-gray-200 shadow-sm max-md:max-w-full">
        {/* Feedback content */}
        <div className="flex gap-3 sm:gap-5 max-md:flex-col">
          <div className="flex flex-col w-full md:w-[23%] max-md:w-full">
            <div className="flex flex-col mt-12 w-full max-md:mt-10">
              <h3 className="self-center text-xl sm:text-2xl font-bold text-center text-white">Personality</h3>
              <StarRating count={metrics.Personality || 0} />
              <h3 className="self-center mt-3.5 text-xl sm:text-2xl font-bold text-center text-white">Teaching</h3>
              <StarRating count={metrics.Teaching || 0} />
              <h3 className="self-center mt-4 text-xl sm:text-2xl font-bold text-center text-white">Grading</h3>
              <StarRating count={metrics.Grading || 0} />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-full md:w-[77%] max-md:ml-0 max-md:w-full">
            <div className="grow px-4 py-2 md:px-7 md:py-4 mt-4 md:mt-10 text-[12px] tracking-tight md:text-xl text-white rounded-lg border-solid border-2 border-gray-200 shadow-sm max-w-full md:max-w-lg break-words overflow-wrap break-word">
              {review}
            </div>
            {isAdmin &&<button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="mt-4 self-end text-white hover:text-red-300 transition-colors"
              title="Delete feedback"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>}
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[95%] sm:w-[450px]">
            <h2 className="text-xl font-bold text-white mb-4">Delete Experience</h2>
            <p className="text-white mb-6">
              Are you sure you want to delete this experience?
            </p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setError(null);
                }}
                className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-[#6E429D] hover:from-[#6A31C1] hover:to-[#2326FE] rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-[#6E429D] hover:from-[#6A31C1] hover:to-[#2326FE] rounded-xl"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;

