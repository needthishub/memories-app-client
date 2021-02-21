import * as api from '../api';

const CREATE = 'POSTS/CREATE';
const UPDATE = 'POSTS/UPDATE';
const DELETE = 'POSTS/DELETE';
const FETCH_ALL = 'POSTS/FETCH_ALL';
const LIKE = 'POSTS/LIKE';
const ERROR = 'POSTS/ERROR';

export const fetchPostsAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const createPostAction = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};
export const updatePostAction = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};
export const likePostAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};
export const deletePostAction = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const selectPostById = (currentId) => (state) => (
  currentId ? state.posts.list.find((message) => message._id === currentId) : null);

export const selectPosts = (state) => state.posts.list;

export const selectError = (state) => state.posts.error;

const INITIAL_STATE = { list: [], error: null };

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_ALL:
      return { list: payload, error: null };
    case LIKE:
      return { list: state.list.map((post) => (post._id === payload._id ? payload : post)), error: null };
    case CREATE:
      return { list: [...state.list, payload], error: null };
    case UPDATE:
      return { list: state.list.map((post) => (post._id === payload._id ? payload : post)), error: null };
    case DELETE:
      return { list: state.list.filter((post) => post._id !== payload), error: null };
    case ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
