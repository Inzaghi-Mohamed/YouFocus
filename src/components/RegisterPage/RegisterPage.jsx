import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
     
      <center>
      <h2 className='font-bold my-2'>Already have an account?</h2>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700   text-white p-2 my-2 border rounded-md cursor-pointer"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
