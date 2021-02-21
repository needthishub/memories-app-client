import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import posts from './posts';

const reducers = combineReducers({ posts });
export const createStorage = (initialState = {}) => (
  createStore(reducers, initialState, compose(applyMiddleware(thunk))));

