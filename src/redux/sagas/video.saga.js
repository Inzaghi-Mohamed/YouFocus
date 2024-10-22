// videoSaga.js
import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVideos(action) {
  try {
    const userId = action.payload;
    const response = yield call(axios.get, `/api/user/${userId}/videos`);
    yield put({ type: 'SET_VIDEOS', payload: response.data });
  } catch (error) {
    console.log('Error fetching videos:', error);
    yield put({ type: 'FETCH_VIDEOS_ERROR' });
  }
}

function* addVideo(action) {
  try {
    const { userId, videoData } = action.payload;
    const response = yield call(axios.post, `/api/user/${userId}/videos`, videoData);
    yield put({ type: 'ADD_VIDEO_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error adding video:', error);
    yield put({ type: 'ADD_VIDEO_ERROR' });
  }
}

function* deleteVideo(action) {
  try {
    const { userId, videoId } = action.payload;
    yield call(axios.delete, `/api/user/${userId}/videos/${videoId}`);
    yield put({ type: 'DELETE_VIDEO_SUCCESS', payload: videoId });
  } catch (error) {
    console.log('Error deleting video:', error);
    yield put({ type: 'DELETE_VIDEO_ERROR' });
  }
}

function* videoSaga() {
  yield takeLatest('FETCH_VIDEOS', fetchVideos);
  yield takeLatest('ADD_VIDEO', addVideo);
  yield takeLatest('DELETE_VIDEO', deleteVideo);
}

export default videoSaga;