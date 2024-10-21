import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white mt-3 rounded-lg shadow-md" onSubmit={registerUser}>
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800" >Sign Up</h2>
      {errors.registrationMessage && (
        <h3 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
          />
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
          />
        </label>
      </div>
      <div className="flex items-center justify-center flex-col ">
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          type="submit"
          name="submit"
          value="Sign Up"
        />
        <p className='font-thin mt-2'>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
      </div>
    </form>
  );
}

export default RegisterForm;