import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import App from './pages/HomePage/Home.jsx';
import './pages/HomePage/Home.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

// Use createRoot to render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement); // Proper usage of createRoot
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>
  );
}
