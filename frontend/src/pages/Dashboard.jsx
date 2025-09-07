import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [apiResponse, setApiResponse] = useState(null);

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      console.error("API call failed:", err);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.picture} alt="profile" style={{ borderRadius: "50px" }} />
      <p>Email: {user.email}</p>
      <button onClick={callApi}>Fetch Health Records</button>
      {apiResponse && (
        <pre style={{ marginTop: '20px', background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Dashboard;
