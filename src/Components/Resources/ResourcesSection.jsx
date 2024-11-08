import React from 'react';
import ResourcesCard from './ResourcesCard/ResourcesCard.jsx';

function ResourcesSection({ resources, categoryTitles, courseName }) {
  return (
    <div className="w-full px-0 py-3 flex flex-col items-center">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4  mb-8 w-full max-w-screen-xl">
        {Object.keys(categoryTitles).map((categoryKey) => {
          const title = categoryTitles[categoryKey];
          const fileCount = resources[categoryKey]?.length || 0;

          return (
            <ResourcesCard
              key={categoryKey}
              categoryKey={categoryKey}
              title={title}
              fileCount={fileCount}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ResourcesSection;
