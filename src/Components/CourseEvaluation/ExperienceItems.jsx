
import React from 'react';
import { RatingStars } from './RatingStars';

const ExperienceItem = ({ difficulty, workload, resources, content }) => {
  return (
    <div data-layername="search" className="flex flex-col justify-center p-1 mt-4 w-full rounded-3xl border-black border-solid border-[3px] max-md:max-w-full">
      <div className="px-3 py-3 rounded-3xl border-solid border-[3px] border-stone-50 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div data-layername="column" className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-12 w-full max-md:mt-10">
              <h3 data-layername="difficulty" className="self-center text-2xl font-bold text-center text-white">
                Difficulty
              </h3>
              <RatingStars count={difficulty} />
              <h3 data-layername="workload" className="self-center mt-3.5 text-2xl font-bold text-center text-white">
                Workload
              </h3>
              <RatingStars count={workload} />
              <h3 data-layername="resources" className="self-center mt-4 text-2xl font-bold text-center text-white">
                Resources
              </h3>
              <RatingStars count={resources} />
            </div>
          </div>
          <div data-layername="column" className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
            <div data-layername="itWasAModeratelyChallengingCourseCoveringKeyTopicsLikeSoftwareProcessesRequirementsAnalysisAndDesignModelsWhileTheConceptsCouldBeDifficultEspeciallyForBeginnersTheyWereManageableWithConsistentEffortTheWorkloadWasSteadyWithRegularAssignmentsGroupProjectsAndExamsThatRequiredBothUnderstandingAndApplicationOfTheMaterialHelpfulResourcesIncludingTextbooksLectureSlidesAndTheInstructorsSupportMadeItEasierToGraspTheConceptsAndSucceedInTheCourse" className="grow px-7 pt-2 pb-20 text-xl text-white rounded-3xl border-solid border-[3px] border-stone-50 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pl-5 max-md:mt-10 max-md:max-w-full">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;