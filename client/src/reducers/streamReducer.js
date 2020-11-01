import {
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {
        ...state,
        ...action.payload.reduce((newState, stream) => {
          newState[stream.id] = stream;
          return newState;
        }, {}),
      };
    case CREATE_STREAM:
    case EDIT_STREAM:
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const { [action.payload]: deleted, ...newState } = state;
      return newState;

    default:
      return state;
  }
};

export default streamReducer;

// FETCH_STREAMS: API returns streams as array of objects:
//  [ {id: 1, title: , description: }, {id: 2 , title: , description: }, {}, ...]
// And we want object of objects with a key for every stream from id and value of all properties:
//  { 1:{id:1, title: , description: , ...}, 2: {id:2, title: , description: , ...}, id:{},...}