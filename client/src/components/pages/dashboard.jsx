// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');

//     if (!token || !userData) {
//       // Not logged in - redirect to login
//       navigate('/login');
//       return;
//     }

//     // Parse and set user data
//     try {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     // Clear localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
    
//     // Redirect to login
//     navigate('/login');
//   };

//   if (!user) {
//     return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h1>Welcome, {user.name}!</h1>
//         <button onClick={handleLogout} style={logoutButtonStyle}>
//           Logout
//         </button>
//       </div>

//       <div style={contentStyle}>
//         <div style={cardStyle}>
//           <h2>Your Account</h2>
//           <div style={infoStyle}>
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//           </div>
//         </div>

//         <div style={cardStyle}>
//           <h2>Dashboard Features</h2>
//           <p>This is your personalized dashboard. Future features will include:</p>
//           <ul>
//             <li>Create and manage your content</li>
//             <li>View your statistics</li>
//             <li>Edit your profile</li>
//             <li>See your activity</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Dashboard;


// import {useAuth}  from "../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import socket from "../../services/socket"
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout, isLoading } = useAuth();

    useEffect(() => {
    // Connect when component mounts (user is logged in)
    socket.connect();

    // Listen for successful connection
    socket.on('connect', () => {
      console.log('🔌 Socket connected:', socket.id);
    });

    // Listen for disconnection
    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    // Listen for connection errors
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    // Cleanup when component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={logout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2>Your Account</h2>
          <div style={infoStyle}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p>
              <strong>Member Since:</strong>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <h2>Dashboard Features</h2>
          <p>This is your personalized dashboard. Future features will include:</p>
          <ul>
            <li>Create and manage your content</li>
            <li>View your statistics</li>
            <li>Edit your profile</li>
            <li>See your activity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


const containerStyle = {
  minHeight: '80vh',
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoutButtonStyle = {
  padding: '0.5rem 1.5rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '500',
};

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
};

const cardStyle = {
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const infoStyle = {
  marginTop: '1rem',
  lineHeight: '2',
};