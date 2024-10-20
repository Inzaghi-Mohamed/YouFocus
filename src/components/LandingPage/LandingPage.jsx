import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('YouFocus');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8 text-green-600">{heading}</h2>
      <p className="text-xl text-center mb-8">Learn, Note, Succeed!</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4">Welcome to YouFocus</h3>
            <p className="mb-4">
              YouFocus is your ultimate learning companion, designed to help you:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Organize your study materials</li>
              <li>Take effective notes</li>
              <li>Track your progress</li>
              <li>Improve your focus and productivity</li>
            </ul>
            <p>
              Join our community of learners and start your journey to academic success today!
            </p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <RegisterForm />

          <div className="text-center mt-8">
            <h4 className="text-lg font-semibold mb-2">Already a Member?</h4>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;