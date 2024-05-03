import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './styles.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <GoogleOAuthProvider clientId="1051684086329-7r3mm2s3u46jraimqsb79o5po14h9qq5.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
);