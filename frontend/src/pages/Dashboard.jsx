import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const { user, getAccessTokenSilently,isAuthenticated, isLoading  } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const token = getAccessTokenSilently();
 return (
  isAuthenticated && (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.picture} alt="profile" style={{ borderRadius: "50px" }} />
      <p>Email: {user.email}</p>
      
    </div>
  )
  );
}

export default Dashboard;
