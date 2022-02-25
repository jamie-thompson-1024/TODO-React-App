
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './Components/App';

import './index.css';

import TodoContext from './Components/TodoContext';
import TodoStorage from './Model/Storage';

const todoStore = new TodoStorage();

todoStore.addEventListener('wipe', () => { window.location.reload(); })

ReactDOM.render(
  <React.StrictMode>
    <TodoContext.Provider value={ todoStore }>
      <App />
    </TodoContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
