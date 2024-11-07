import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between w-full text-2xl text-white max-w-[1112px] max-md:max-w-full">
      <div data-layername="thePlatform" className="font-bold">
        The Platform
      </div>
      <nav className="flex gap-10 self-start mt-2.5 text-center">
        <a href="/" className="z-10 self-start pt-0 pb-2 whitespace-nowrap">Home</a>
        <a href="/courses" className="z-10 self-start pt-0 pb-2 whitespace-nowrap">Courses</a>
        <a href="/groups" className="z-10 pt-0 pb-2 whitespace-nowrap">Groups</a>
        <a href="/logout" className="z-10 pt-0 pb-2">Log out</a>
      </nav>
      <div className="shrink-0 mt-7 max-w-full h-0.5 border-2 border-white border-solid bg-zinc-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[1124px]" />
    </header>
  );
};

export default Header;