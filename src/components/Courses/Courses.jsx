import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_COURSES' });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourseId) {
      dispatch({
        type: 'UPDATE_COURSE',
        payload: { id: editingCourseId, title, description, progress }
      });
      setEditingCourseId(null);
    } else {
      dispatch({
        type: 'ADD_COURSE',
        payload: { title, description, progress }
      });
    }
    // Reset form fields
    setTitle('');
    setDescription('');
    setProgress(0);
  };

  const handleUpdate = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setProgress(course.progress);
    setEditingCourseId(course.id);
  };

  const handleDelete = (courseId) => {
    dispatch({
      type: 'DELETE_COURSE',
      payload: courseId
    });
  };

  const cancelEdit = () => {
    setEditingCourseId(null);
    setTitle('');
    setDescription('');
    setProgress(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
      <h1 className="text-3xl font-bold mb-8 text-center">My Courses</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Course List */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses added yet.</p>
          ) : (
            <ul className="space-y-4">
              {courses.map((course) => (
                <li key={course.id} className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">Progress:</span>
                    <div className="bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between space-x-2">
                    <button
                      onClick={() => handleUpdate(course)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                  <button className='bg-blue-500 hover:bg-blue-700  text-white p-1 my-2 border rounded-md'> Search on YouTube</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right side: Add/Edit Course Form */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">
            {editingCourseId ? 'Edit Course' : 'Add New Course'}
          </h2>
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progress</label>
              <input
                type="number"
                id="progress"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                min="0"
                max="100"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editingCourseId ? 'Update Course' : 'Add Course'}
              </button>
              {editingCourseId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Courses;