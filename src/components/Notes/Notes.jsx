import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Notes() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [notes, setNotes] = useState({});
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    // Initialize notes for each course
    const initialNotes = courses.reduce((acc, course) => {
      acc[course.id] = course.notes || '';
      return acc;
    }, {});
    setNotes(initialNotes);
  }, [courses]);

  const handleNoteChange = (courseId, value) => {
    setNotes(prevNotes => ({
      ...prevNotes,
      [courseId]: value
    }));
  };

  const handleSaveNote = (courseId) => {
    const updatedCourse = courses.find(course => course.id === courseId);
    if (updatedCourse) {
      dispatch({
        type: 'UPDATE_COURSE',
        payload: { 
          ...updatedCourse,
          notes: notes[courseId]
        }
      });
    }
    setEditingNoteId(null);
  };

  const handleEditNote = (courseId) => {
    setEditingNoteId(courseId);
  };

  const handleDeleteNote = (courseId) => {
    const updatedCourse = courses.find(course => course.id === courseId);
    if (updatedCourse) {
      dispatch({
        type: 'UPDATE_COURSE',
        payload: { 
          ...updatedCourse,
          notes: ''
        }
      });
    }
    setNotes(prevNotes => ({
      ...prevNotes,
      [courseId]: ''
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">My Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
            <textarea
              value={notes[course.id] || ''}
              onChange={(e) => handleNoteChange(course.id, e.target.value)}
              disabled={editingNoteId !== course.id}
              className="w-full h-32 p-2 border rounded-md mb-4 resize-none"
              placeholder="Take your notes here..."
            />
            <div className="flex justify-between">
              {editingNoteId === course.id ? (
                <button
                  onClick={() => handleSaveNote(course.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditNote(course.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteNote(course.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;