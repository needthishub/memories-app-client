import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStorage } from './storage';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={createStorage()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
