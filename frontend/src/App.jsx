import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientRecords from './pages/PatientRecords';
import Admin from './pages/Admin';
import Registration from './pages/Registration';
import MigrantProfile from './pages/MigrantProfile';
import ProtectedRoute from './components/ProtectedRoute';
import HealthRecords from './pages/HealthRecords';
import DiseaseSurveillance from './pages/DiseaseSurveillance';
import SDGProgress from './pages/SDGProgress';
import Reports from './pages/Reports';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function App() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:8000/users/', {
        auth0_id: user.sub,
        role: 'Migrant' // Default role, you can change this based on your logic
      });
    }
  }, [isAuthenticated, user]);
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <HealthRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveillance"
          element={
            <ProtectedRoute>
              <DiseaseSurveillance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sdg"
          element={
            <ProtectedRoute>
              <SDGProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MigrantProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
