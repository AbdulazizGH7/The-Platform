import React from "react";
import SectionCard from "./SectionCard";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function CourseGroupLayout() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Section Cards Layout */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full max-w-7xl mt-10">
        <SectionCard title="Courses" items={user.courses} />
        <div className="hidden lg:block h-full w-px bg-gray-300"></div>
        <SectionCard title="Groups" items={user.groups} />
      </div>

      {/* Action Button */}
      <div className="my-8">
        <Link to="/courseSearch" aria-label="Search for a course">
          <Button
            title="Search Course"
            textSize="xl"
            px="10"
            className="hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
          />
        </Link>
      </div>
    </div>
  );
}

export default CourseGroupLayout;
