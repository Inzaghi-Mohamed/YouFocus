import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCourses() {
  try {
    const response = yield call(axios.get, '/api/courses');
    yield put({ type: 'SET_COURSES', payload: response.data });
  } catch (error) {
    console.log('Error fetching courses:', error);
    yield put({ type: 'COURSES_ERROR' });
  }
}

function* addCourse(action) {
  try {
    const response = yield call(axios.post, '/api/courses', action.payload);
    yield put({ type: 'ADD_COURSE_SUCCESS', payload: response.data });
    yield put({ type: 'FETCH_COURSES' }); // Refresh the course list
  } catch (error) {
    console.log('Error adding course:', error);
    yield put({ type: 'COURSES_ERROR' });
  }
}

function* updateCourse(action) {
  try {
    const response = yield call(axios.put, `/api/courses/${action.payload.id}`, action.payload);
    yield put({ type: 'UPDATE_COURSE_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error updating course:', error);
    yield put({ type: 'COURSES_ERROR' });
  }
}

function* deleteCourse(action) {
  try {
    yield call(axios.delete, `/api/courses/${action.payload}`);
    yield put({ type: 'DELETE_COURSE_SUCCESS', payload: action.payload });
  } catch (error) {
    console.log('Error deleting course:', error);
    yield put({ type: 'COURSES_ERROR' });
  }
}

function* coursesSaga() {
  yield takeLatest('FETCH_COURSES', fetchCourses);
  yield takeLatest('ADD_COURSE', addCourse);
  yield takeLatest('UPDATE_COURSE', updateCourse);
  yield takeLatest('DELETE_COURSE', deleteCourse);
}

export default coursesSaga;