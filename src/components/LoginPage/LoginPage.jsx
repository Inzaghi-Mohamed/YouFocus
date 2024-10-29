import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
// import { useHistory } from 'react-router-dom'; // Replaced with the modern 'useNavigate'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // const history = useHistory();
  const navigate = useNavigate();


  return (
    <div>
      <LoginForm />

      <div className="mt-4 flex items-center justify-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <p className="mx-4 text-gray-500">Or</p>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <center className="mt-4">
        <button
          type="button"
          className="bg-green-500 text-white p-2 my-2 border rounded-md hover:cursor-pointer"
          onClick={() => {
            navigate('/registration');
          }}
        >
          Create new Account
        </button>
      </center>
    </div>
  );
}

export default LoginPage;