import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LandingPage() {
  const [heading] = useState('YouFocus');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/registration');
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Welcome to <span className="text-blue-600">{heading}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8">
              Organize, Focus, and Succeed with YouFocus - Your Ultimate Learning Companion
            </p>
            <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onLogin}
          >
           JOIN
          </button>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="./images/LandingImage.jpg" 
              alt="YouFocus App" 
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose YouFocus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Organize Materials", icon: "📚" },
              { title: "Effective Note-Taking", icon: "✏️" },
              { title: "Track Progress", icon: "📊" },
              { title: "Boost Productivity", icon: "🚀" },
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6 text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">Empower your learning journey with our intuitive tools.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <blockquote className="text-2xl italic mb-8">
            "YouFocus transformed my study habits. I'm more organized and productive than ever!"
          </blockquote>
          <p className="font-semibold">- Sarah K., Medical Student</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Ready to Elevate Your Learning?</h2>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onLogin}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;