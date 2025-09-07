import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
 

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
     domain="dev-80yd7ehi43fqphtt.us.auth0.com"
     clientId="ajsjAyfi3knKQ9qSXxYPeyyfpbqW8leY"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);