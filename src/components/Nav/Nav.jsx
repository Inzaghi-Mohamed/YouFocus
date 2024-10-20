import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <nav className="bg-blue-700 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-2xl font-bold">
         YouFocus
        </Link>
        <div className="flex space-x-4">
          {/* If no user is logged in, show these links */}
          {!user.id && (
            <Link className="text-gray-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/login">
              Login / Register
            </Link>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Link className="text-gray-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/user">
                Home
              </Link>

              <Link className="text-gray-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/info">
                Info Page
              </Link>

              <LogOutButton className="text-gray-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" />
            </>
          )}

          <Link className="text-gray-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;