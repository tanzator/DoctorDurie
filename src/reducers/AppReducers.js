
import {
    COUNT_DETAIL_CHANGED
  } from './../actions/Types';
  
  const initialState = {
      count: 0,
    };
    
    const AppReducers = (state = initialState, action) => {
      switch (action.type) {
  
        case COUNT_DETAIL_CHANGED:
          return {...state, count: action.payload };
  
        default:
          return state;
      }
    };
    
    export default AppReducers;