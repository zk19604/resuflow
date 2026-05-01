// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';   // ← NEW
import { router } from './routes';
import './index.css';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>          {/* ← NEW wrapper */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
 
