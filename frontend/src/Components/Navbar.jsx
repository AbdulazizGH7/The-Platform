import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {useUser} from '../contexts/UserContext'

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {logout} = useUser()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {  
      logout();  
      navigate('/login');  
    };  

  // Common link styles with hover effect
  const linkClass = 'text-gray-100 font-light text-lg lg:text-xl relative after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-gray-100 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full';

  const NavItems = () => (
    <>
      <li className='hidden sm:list-item'>
        <Link to="/home" className={linkClass}>Home</Link>
      </li>
      <li className='hidden sm:list-item'>
        {location.pathname === "/home" ? (
          <a href='#courseGroup' className={linkClass}>Courses</a>
        ) : (
          <Link to="/home" className={linkClass}>Courses</Link>
        )}
      </li>
      <li className='hidden sm:list-item'>
        {location.pathname === "/home" ? (
          <a href='#courseGroup' className={linkClass}>Groups</a>
        ) : (
          <Link to="/home" className={linkClass}>Groups</Link>
        )}
      </li>
      {/* Log Out Link for Desktop */}
      <li className='hidden sm:list-item'>
        <Link to="/login" onClick={handleLogout} className={linkClass}>Log out</Link>
      </li>
    </>
  );
  

  return (
    <>
      <nav className='relative border-b border-gray-700 transition-all duration-300 '>
        <div className='flex justify-between items-center py-4 px-4'>
          <Link to="/home" className={`text-gray-100 font-semibold text-lg lg:text-xl ${linkClass}`}>
            <h1>The Platform</h1>
          </Link>
          
          {/* Desktop Menu */}
          <ul className='flex gap-8'>
            <NavItems />
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className='sm:hidden text-gray-100 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={` rounded-b-lg sm:hidden absolute w-full bg-indigo-950 shadow-lg transition-all duration-300 ease-in-out border-b border-gray-700 ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 max-h-96' 
              : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden'
          }`}
        >
          <ul className='flex flex-col items-center gap-6 py-4'>
            <li>
              <Link to="/home" className={linkClass}>Home</Link>
            </li>
            <li>
              {location.pathname === "/home" ? (
                <a href='#courseGroup' className={linkClass}>Courses</a>
              ) : (
                <Link to="/home" className={linkClass}>Courses</Link>
              )}
            </li>
            <li>
              {location.pathname === "/home" ? (
                <a href='#courseGroup' className={linkClass}>Groups</a>
              ) : (
                <Link to="/home" className={linkClass}>Groups</Link>
              )}
            </li>
            <li>
              <Link to="/login" onClick={handleLogout} className={linkClass}>Log out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;