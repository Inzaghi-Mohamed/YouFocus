import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import LogOutButton from '../LogOutButton/LogOutButton';

function Nav() {
  const user = useSelector((store) => store.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-green-500' : 'hover:bg-green-500';
  };

  return (
    <nav className="bg-blue-700 text-white fixed top-0 left-0 right-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex justify-between items-center">
              <img src="/images/YouFocusLogo.png" alt="" className='w-14 border rounded-full ' />
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-pink-600 text-transparent bg-clip-text">YouFocus</h2>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!user.id && (
                <Link className={`${isActive('/registration')} px-3 py-2 rounded-md text-sm font-medium`} to="/registration">
                  Get Started
                </Link>
              )}
              {user.id && (
                <>
                  <Link className={`${isActive('/user')} px-3 py-2 rounded-md text-sm font-medium`} to="/user">
                    Courses
                  </Link>
                  <Link className={`${isActive('/info')} px-3 py-2 rounded-md text-sm font-medium`} to="/info">
                    Notes
                  </Link>
                  <Link className={`${isActive('/Yt-search')} px-3 py-2 rounded-md text-sm font-medium`} to="/Yt-search">
                    Youtube Search
                  </Link>
                  <Link className={`${isActive('/selectedVideos')} px-3 py-2 rounded-md text-sm font-medium`} to="/selectedVideos">
                    Selected Videos
                  </Link>
                  <LogOutButton className="hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium" />
                </>
              )}
              <Link className={`${isActive('/about')} px-3 py-2 rounded-md text-sm font-medium`} to="/about">
                About
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user.id && (
              <Link className={`${isActive('/login')} block px-3 py-2 rounded-md text-base font-medium`} to="/login" onClick={toggleMenu}>
                Get Started
              </Link>
            )}
            {user.id && (
              <>
                <Link className={`${isActive('/user')} block px-3 py-2 rounded-md text-base font-medium`} to="/user" onClick={toggleMenu}>
                  Courses
                </Link>
                <Link className={`${isActive('/info')} block px-3 py-2 rounded-md text-base font-medium`} to="/info" onClick={toggleMenu}>
                  Notes
                </Link>
                <Link className={`${isActive('/Yt-search')} block px-3 py-2 rounded-md text-base font-medium`} to="/Yt-search" onClick={toggleMenu}>
                  YouTube Search
                </Link>
                <Link className={`${isActive('/selectedVideos')} block px-3 py-2 rounded-md text-base font-medium`} to="/selectedVideos" onClick={toggleMenu}>
                  Selected Videos
                </Link>
                <LogOutButton className="hover:bg-green-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left" onClick={toggleMenu} />
              </>
            )}
            <Link className={`${isActive('/about')} block px-3 py-2 rounded-md text-base font-medium`} to="/about" onClick={toggleMenu}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;