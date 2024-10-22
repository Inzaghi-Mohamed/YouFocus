const initialState = {
  savedVideos: [],
  youtubeSearchResults: {
    items: [],
    nextPageToken: null
  },
  error: null
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { ...state, savedVideos: action.payload };
    case 'ADD_VIDEO_SUCCESS':
      return { ...state, savedVideos: [...state.savedVideos, action.payload] };
    case 'DELETE_VIDEO_SUCCESS':
      return { ...state, savedVideos: state.savedVideos.filter(video => video.id !== action.payload) };
    case 'SET_YOUTUBE_SEARCH_RESULTS':
      return {
        ...state,
        youtubeSearchResults: {
          items: action.payload.items,
          nextPageToken: action.payload.nextPageToken
        }
      };
    case 'FETCH_VIDEOS_ERROR':
    case 'ADD_VIDEO_ERROR':
    case 'DELETE_VIDEO_ERROR':
    case 'YOUTUBE_SEARCH_ERROR':
      console.log('Error in video operation:', action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default videoReducer;