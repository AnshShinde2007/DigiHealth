import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE, // must match FastAPI audience
          });
          setToken(accessToken);
        } catch (err) {
          console.error("Token fetch error:", err);
        }
      }
    };
    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <div>Loading ...</div>;
  if (!isAuthenticated) return <div>Please log in.</div>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.picture} alt="profile" style={{ borderRadius: "50px" }} />
      <p>Email: {user.email}</p>
      <p>Access Token: {token}</p>
    </div>
  );
}

export default Dashboard;
