import React, { StrictMode } from 'react'; // ✅ Make sure "React" is capitalized
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
