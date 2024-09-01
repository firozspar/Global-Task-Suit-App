// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Createtask from './pages/CreateTask';

// const theme = createTheme({
//   // will customize the theme here later
// });


// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/createtask" element={<Createtask />} />
//       </Routes>
//     </Router>
//   </ThemeProvider>
    
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MsalProvider, useMsal } from '@azure/msal-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import { msalInstance } from "./authConfig";

const ProtectedRoute = ({ element, ...rest }) => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/createtask" element={<ProtectedRoute element={<CreateTask />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;



