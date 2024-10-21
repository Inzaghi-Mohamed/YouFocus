import React from 'react';

function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About YouFocus
        </h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At YouFocus, we're dedicated to helping students and lifelong learners maximize their potential through better organization, focus, and study techniques. Our app is designed to be your personal learning assistant, guiding you towards academic success and personal growth.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Personalized study planners</li>
            <li>Focus-enhancing tools and techniques</li>
            <li>Progress tracking and analytics</li>
            <li>Note-taking and organization features</li>
            <li>Collaborative study groups</li>
            <li>Expert-curated learning resources</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            YouFocus was founded in 2023 by a group of students who were frustrated with existing study tools. We set out to create an all-in-one platform that addresses the real challenges faced by learners in the digital age. Today, we're proud to help thousands of users worldwide achieve their learning goals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:support@youfocus.com" className="text-blue-600 hover:underline">support@youfocus.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;