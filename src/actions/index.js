import streams from "../api/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "./types";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  // programmatically navigate user to root route after stream was successfully created
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Often times APIs are configured as follows:
//  PUT requests update ALL properties of a record with only what you actually provide on submission
//  (form sends title and description, but not userId, of course, and it will be missing)
//  need to use PATCH request then to update SOME of properties
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};