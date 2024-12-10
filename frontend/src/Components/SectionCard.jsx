import React, { useEffect, useState } from'react';
import ItemCard from './ItemCard';
import { Link } from'react-router-dom';
import { useData } from '../utilities/DataContext';
import axios from 'axios';

/**
 * SectionCard component displays a section with a title and a list of items.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the section
 * @param {array} props.items - List of item IDs
 * @returns {JSX.Element} SectionCard component
 */
function SectionCard({ title, items }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = title === 'Courses'? 'https://the-platform-backend.onrender.com/api/users/courses' : 'https://the-platform-backend.onrender.com/api/users/groups';
        const response = await axios.post(url, title === 'Courses'? { coursesIds: items } : { groupsIds: items });
        setData(response.data[title.toLowerCase()]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, [title, items]);

  if (loading) {
    return (
      <div className="section-card rounded-md text-center w-full sm:max-w-[600px] 2xl:max-w-[900px] lg:self-stretch">
        <h2 className="text-gray-100 font-bold text-3xl py-5 sm:text-4xl">{title}</h2>
        <hr className="w-[95%] my-0 mx-auto" />
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold px-1">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-card rounded-md text-center w-full sm:max-w-[600px] 2xl:max-w-[900px] lg:self-stretch">
        <h2 className="text-gray-100 font-bold text-3xl py-5 sm:text-4xl">{title}</h2>
        <hr className="w-[95%] my-0 mx-auto" />
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold px-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-card rounded-md text-center w-full sm:max-w-[600px] 2xl:max-w-[900px] lg:self-stretch">
      <h2 className="text-gray-100 font-bold text-3xl py-5 sm:text-4xl">{title}</h2>
      <hr className="w-[95%] my-0 mx-auto" />
      {items.length > 0? (
        <ul className="flex flex-col gap-3 mt-2">
          {data.map((item) => (
            <li className="first:mt-2 last:mb-4" key={item._id}>
              <Link to={title === 'Courses'? `/course/${item._id}` : `/group/${item._id}`}>
                <ItemCard text={title === 'Courses'? item.courseCode : item.groupName} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          {title === 'Courses'? (
            <p className="text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold px-1">
              No Courses Added Yet. Start <br /> Building Your Schedule Now!
            </p>
          ) : (
            <p className="text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold px-1">
              You’re Not in Any Groups. <br /> Discover Groups to Join!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SectionCard;