import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const { loginWithRedirect,logout } = useAuth0();

  return (
    <div>
      <h1>Login</h1>
      <p>Please log in to access the dashboard.</p>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button className='bg-blue-500' onClick={() => logout()}>Log Out
      </button>
    </div>

  );
}

export default Login;
