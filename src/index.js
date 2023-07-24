import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers/taskReducers';

// Importa createRoot desde "react-dom/client"
import { createRoot } from 'react-dom/client';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const root = document.getElementById('root');

// Usa createRoot en lugar de ReactDOM.render
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
