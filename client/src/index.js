import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Provider } from './Context';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);