// videoReducer.js
const initialState = [];

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return action.payload;
    case 'ADD_VIDEO_SUCCESS':
      return [...state, action.payload];
    case 'DELETE_VIDEO_SUCCESS':
      return state.filter(video => video.id !== action.payload);
    case 'FETCH_VIDEOS_ERROR':
    case 'ADD_VIDEO_ERROR':
    case 'DELETE_VIDEO_ERROR':
      console.log('Error in video operation');
      return state;
    default:
      return state;
  }
};

export default videoReducer;