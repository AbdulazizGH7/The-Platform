import React from 'react';
import { RatingStars } from './RatingStars';

const ExperienceItem = ({ metrics, description }) => {
  const { difficulty, workload, resources } = metrics;

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
