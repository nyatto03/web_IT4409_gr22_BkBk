// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routesConfig from './routes'; // Import cấu hình từ thư mục routes

function App() {
  return (
    <div className="App">
      <Routes>
        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
