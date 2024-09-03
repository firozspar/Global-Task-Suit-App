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
const ProtectedRoute = ({ element, ...rest }) => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [profileName, setProfileName] = useState('');

  return (
    <MsalProvider instance={msalInstance}>
      <Provider store={store}> {/* Provide the Redux store */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Header setProfileName={setProfileName} />
                      <Dashboard profileName={profileName} />
                    </>
                  }
                />
              }
            />
            <Route
              path="/createtask"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Header setProfileName={setProfileName} />
                      <CreateTask profileName={profileName} />
                    </>
                  }
                />
              }
            />
          </Routes>
        </Router>
      </Provider>
    </MsalProvider>
  );
}

export default App;
