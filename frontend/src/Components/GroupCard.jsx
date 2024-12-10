import React from 'react';

const GroupCard = ({ title, action, onDelete, showDeleteButton }) => {
  return (
    <div className="relative group">
      <div className="
        bg-gradient-to-br from-purple-600 to-purple-800 
        border border-purple-500/30 
        rounded-xl 
        shadow-2xl 
        overflow-hidden 
        transition-all 
        duration-300 
        hover:shadow-purple-500/50 
        p-6 
        text-center 
        relative
      ">
        {/* Delete Button */}
        {showDeleteButton && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="
              absolute 
              top-3 
              right-3 
              bg-red-500/80 
              hover:bg-red-600 
              text-white 
              rounded-full 
              w-8 
              h-8 
              flex 
              items-center 
              justify-center 
              transition-all 
              duration-300 
              hover:rotate-6 
              hover:scale-110 
              z-10
              shadow-md
              hover:shadow-lg
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {/* Group Title */}
        <h2 className="
          text-xl 
          font-bold 
          mb-4 
          text-white 
          transition-colors 
          duration-300
        ">
          {title}
        </h2>

        {/* Action Section */}
        <div className="
          mt-4 
          flex 
          justify-center 
          items-center
        ">
          {React.isValidElement(action) && React.cloneElement(action, {
            className: `
              ${action.props.className || ''}
              px-4 
              py-2 
              rounded-lg 
              bg-purple-500 
              hover:bg-purple-600 
              text-white 
              font-semibold 
              transition-colors 
              duration-300 
              inline-block 
              text-center 
              w-full
            `
          })}
        </div>

        {/* Background Overlay */}
        <div className="
          absolute 
          inset-0 
          bg-purple-800/10 
          pointer-events-none
        "></div>
      </div>
    </div>
  );
};

export default GroupCard;