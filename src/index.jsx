import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main'; // Import your Main component
import './index.css'; // Import global styles if any

// Render the Main component into the root div in index.html
ReactDOM.render(
  <React.StrictMode>
    <Main />  {/* Main component containing routes */}
  </React.StrictMode>,
  document.getElementById('root')  // Mount the app to the root div in index.html
);
