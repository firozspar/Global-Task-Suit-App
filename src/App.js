import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { Provider } from 'react-redux'; // Import Provider
import store from './store/store'; // Import the store
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import { msalInstance } from "./authConfig";
import Header from './components/Header';

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const [profileName, setProfileName] = useState('');

  return (
    <MsalProvider instance={msalInstance}>
      <Provider store={store}> {/* Provide the Redux store */}
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Header setProfileName={setProfileName} />
                  <Dashboard profileName={profileName} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/createtask" 
              element={
                <ProtectedRoute>
                  <Header setProfileName={setProfileName} />
                  <CreateTask profileName={profileName} />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all Route for 404 Handling */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Provider>
    </MsalProvider>
  );
}

export default App;
