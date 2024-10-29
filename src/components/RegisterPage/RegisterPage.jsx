import React from 'react';

import { useNavigate } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterForm />
     
      <center>
      <h2 className='font-bold my-2'>Already have an account?</h2>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700   text-white p-2 my-2 border rounded-md cursor-pointer"
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
