import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
 import 'bootstrap/dist/css/bootstrap.min.css';


const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-80yd7ehi43fqphtt.us.auth0.com"
    clientId="ajsjAyfi3knKQ9qSXxYPeyyfpbqW8leY"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://www.digihealth.com",
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);