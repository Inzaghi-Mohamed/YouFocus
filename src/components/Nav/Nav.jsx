import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import LogOutButton from '../LogOutButton/LogOutButton';

function Nav() {
  const user = useSelector((store) => store.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0">
              <h2 className="text-xl font-bold">YouFocus</h2>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!user.id && (
                <Link className="hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium" to="/registration">
                  Get Started
                </Link>
              )}
              {user.id && (
                <>
                  <Link className="hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium" to="/user">
                    Courses
                  </Link>
                  <Link className="hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium" to="/info">
                    Info Page
                  </Link>
                  <LogOutButton className="hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium" />
                </>
              )}
              <Link className="hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium" to="/about">
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
              <Link className="hover:bg-green-500 block px-3 py-2 rounded-md text-base font-medium" to="/login" onClick={toggleMenu}>
                Get Started
              </Link>
            )}
            {user.id && (
              <>
                <Link className="hover:bg-green-500 block px-3 py-2 rounded-md text-base font-medium" to="/user" onClick={toggleMenu}>
                 Courses
                </Link>
                <Link className="hover:bg-green-500 block px-3 py-2 rounded-md text-base font-medium" to="/info" onClick={toggleMenu}>
                  Info Page
                </Link>
                <LogOutButton className="hover:bg-green-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left" onClick={toggleMenu} />
              </>
            )}
            <Link className="hover:bg-green-500 block px-3 py-2 rounded-md text-base font-medium" to="/about" onClick={toggleMenu}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;