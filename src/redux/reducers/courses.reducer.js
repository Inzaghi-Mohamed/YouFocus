const coursesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COURSES':
        return action.payload;
      case 'ADD_COURSE_SUCCESS':
        return [...state, action.payload];
      case 'UPDATE_COURSE_SUCCESS':
        return state.map(course => 
          course.id === action.payload.id ? action.payload : course
        );
      case 'DELETE_COURSE_SUCCESS':
        return state.filter(course => course.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default coursesReducer;