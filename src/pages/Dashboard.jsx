import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <h2>Dashboard</h2>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3>Welcome, {user?.username}!</h3>
          <p style={{ marginTop: '1rem', color: '#a0aabf' }}>
            This is a protected route. Only logged-in users can see this page.
            Your session is maintained using localStorage and your password is securely hashed with SHA-256.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
