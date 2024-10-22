import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVideos() {
  try {
    const response = yield call(axios.get, '/api/videos');
    yield put({ type: 'SET_VIDEOS', payload: response.data });
  } catch (error) {
    console.error('Error fetching videos:', error);
    yield put({ type: 'FETCH_VIDEOS_ERROR', payload: error.message });
  }
}

function* addVideo(action) {
  try {
    const videoData = action.payload;
    const response = yield call(axios.post, '/api/videos', videoData);
    yield put({ type: 'ADD_VIDEO_SUCCESS', payload: response.data });
    // After successfully adding the video, fetch all videos again
    yield put({ type: 'FETCH_VIDEOS' });
  } catch (error) {
    console.error('Error adding video:', error);
    yield put({ type: 'ADD_VIDEO_ERROR', payload: error.message });
  }
}

function* deleteVideo(action) {
  try {
    const videoId = action.payload;
    yield call(axios.delete, `/api/videos/${videoId}`);
    yield put({ type: 'DELETE_VIDEO_SUCCESS', payload: videoId });
    // After successfully deleting the video, fetch all videos again
    yield put({ type: 'FETCH_VIDEOS' });
  } catch (error) {
    console.error('Error deleting video:', error);
    yield put({ type: 'DELETE_VIDEO_ERROR', payload: error.message });
  }
}

function* videoSaga() {
  yield takeLatest('FETCH_VIDEOS', fetchVideos);
  yield takeLatest('ADD_VIDEO', addVideo);
  yield takeLatest('DELETE_VIDEO', deleteVideo);
}

export default videoSaga;