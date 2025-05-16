import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// Get the root element
const rootElement = document.getElementById('root')!;

// Create root and render with Router and Routes
createRoot(rootElement).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
