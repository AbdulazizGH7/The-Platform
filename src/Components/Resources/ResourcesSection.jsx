// src/Components/Resources/ResourcesSection.jsx
import React from 'react';
import ResourcesCard from './ResourcesCard/ResourcesCard.jsx';
import { Link } from 'react-router-dom';

function ResourcesSection({ resources, categoryTitles, courseId }) {
  return (
    <div className="w-full px-0 py-3 flex flex-col items-center">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-8 w-full max-w-screen-xl">
        {Object.keys(categoryTitles).map((categoryKey) => {
          const title = categoryTitles[categoryKey];
          const fileCount = resources[categoryKey]?.length || 0;

          return (
            <Link
              key={categoryKey}
              to={`/course/${courseId}/resources/${categoryKey}`}
              className="text-blue-400 hover:underline"
            >
              <ResourcesCard
                categoryKey={categoryKey}
                title={title}
                fileCount={fileCount}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ResourcesSection;
