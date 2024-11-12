import React, { useState } from 'react';
import { RatingStars } from './RatingStars';
import { useData } from '../../utilities/DataContext';


const ExperienceItem = ({ metrics, description, onDelete }) => {
  const { difficulty, workload, resources } = metrics;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useData();

  const isAdmin = user.role === 'admin';
console.log('User:', user, 'Is Admin:', isAdmin);


  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      data-layername="search"
      className="flex flex-col justify-center p-1 mt-4 w-full rounded-3xl border-solid border-[3px] max-md:max-w-full"
    >
      <div className="px-4 py-4 rounded-lg border-solid border-gray-200 shadow-sm max-md:max-w-full">
        <div className="flex gap-3 sm:gap-5 max-md:flex-col">
          <div
            data-layername="column"
            className="flex flex-col w-full md:w-[23%] max-md:w-full"
          >
            <div className="flex flex-col mt-12 w-full max-md:mt-10">
              <h3
                data-layername="difficulty"
                className="self-center text-xl sm:text-2xl font-bold text-center text-white"
              >
                Difficulty
              </h3>
              <RatingStars count={difficulty || 0} />
              <h3
                data-layername="workload"
                className="self-center mt-3.5 text-xl sm:text-2xl font-bold text-center text-white"
              >
                Workload
              </h3>
              <RatingStars count={workload || 0} />
              <h3
                data-layername="resources"
                className="self-center mt-4 text-xl sm:text-2xl font-bold text-center text-white"
              >
                Resources
              </h3>
              <RatingStars count={resources || 0} />
            </div>
          </div>
          <div
            data-layername="column"
            className="flex flex-col ml-5 w-full md:w-[77%] max-md:ml-0 max-md:w-full"
          >
            <div
              data-layername="content"
              className="grow px-7 pt-2 pb-20 text-xl text-white rounded-lg border-solid border-2 border-gray-200 shadow-sm max-md:pl-5 max-md:mt-10 max-md:max-w-full break-words overflow-wrap break-word"
            >
              {description}
            </div>
            {isAdmin && <button 
          onClick={() => setIsDeleteModalOpen(true)}
          className="mt-4 self-end text-white hover:text-red-300 transition-colors"
          title="Delete announcement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>}
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gradient-to-r from-[#171352] to-[#6E429D] p-6 rounded-lg shadow-lg w-[95%] sm:w-[450px]">
            <h2 className="text-xl font-bold text-white mb-4">Delete Experience</h2>
            <p className="text-white mb-6">Are you sure you want to delete this experience?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-[#6E429D] hover:from-[#6A31C1] hover:to-[#2326FE]  rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 text-white bg-gradient-to-r from-purple-500 to-[#6E429D] hover:from-[#6A31C1] hover:to-[#2326FE]  rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceItem;
