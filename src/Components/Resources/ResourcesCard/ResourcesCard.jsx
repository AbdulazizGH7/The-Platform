import React from "react";
import { useNavigate } from 'react-router-dom';

function ResourcesCard({ categoryKey, title, fileCount }) {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/resources/${categoryKey}`);
    };

    return (
      <div
        onClick={handleClick}
        className="group relative w-full aspect-square flex-shrink-0 rounded-[10px] flex flex-col items-center justify-center m-
          bg-gradient-to-r from-[#171352] to-[#6E429D] border-2 border-transparent hover:border-white
          transition-all duration-300 cursor-pointer overflow-hidden">
        <div
          className="absolute inset-0 rounded-[10px]
            bg-gradient-to-r from-transparent via-transparent to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300 ease-in-out
            pointer-events-none
          ">
          </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-white text-center font-outfit text-[clamp(1.8rem,5vw,2.5rem)] font-medium leading-tight tracking-normal px-4">
            {title}
          </div>
          <div className="mt-2 text-white text-center font-outfit text-[clamp(1rem,3vw,1.5rem)] font-normal">
            ({fileCount} {fileCount === 1 ? 'file' : 'files'})
          </div>
        </div>
      </div>
    );
  }

export default ResourcesCard;
