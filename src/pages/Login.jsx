// import React, { useState } from 'react';
// import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
// import { styled } from '@mui/system';
// import { MsalProvider, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
// import { useNavigate } from 'react-router-dom';
// import {msalInstance} from "../authConfig";

// const StyledContainer = styled(Container)({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
// });

// const StyledPaper = styled(Paper)({
//   padding: '2rem',
//   maxWidth: '400px',
//   width: '100%',
//   backgroundColor: '#f0f0f0',
// });

// const LoginButton = () => {
//   const { instance } = useMsal();

//   const handleLogin = () => {
//     instance.loginRedirect();
//   };

//   return <button 
//   onClick={handleLogin} 
//   style={{ padding: '5px', display: 'block', marginTop: '10px' }}
// >
//   Login with Azure AD
// </button>
// };

// const LogoutButton = () => {
//   const { instance } = useMsal();

//   const handleLogout = () => {
//     instance.logoutRedirect();
//   };

//   return <button onClick={handleLogout}>Logout with Azure AD</button>;
// };

// const Login = () => {
//   const [inputPasswordValue, setInputPasswordValue] = useState('');
//   const [inputEmailValue, setInputEmailValue] = useState('');
//   const navigate = useNavigate();

//   const handleInputPasswordChange = (event) => {
//     setInputPasswordValue(event.target.value);
//   };

//   const handleInputEmailChange = (event) => {
//     setInputEmailValue(event.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(inputEmailValue, inputPasswordValue);

//     if (inputEmailValue === 'test@sparsolutions.com' && inputPasswordValue === 'spar') {
//       navigate('/dashboard');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <StyledContainer>
//       <StyledPaper elevation={3}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Task Manager
//         </Typography>
//         <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             onChange={handleInputEmailChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             onChange={handleInputPasswordChange}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{
//               backgroundColor: '#7784EE',
//               '&:hover': {
//                 backgroundColor: 'gray',
//               },
//             }}
//           >
//             Sign In
//           </Button>

//           <MsalProvider instance={msalInstance}>
//             <AuthenticatedTemplate>
//               <h1>  Welcome -</h1>
//               <LogoutButton />
//             </AuthenticatedTemplate>
//             <UnauthenticatedTemplate>
//               <LoginButton />
//             </UnauthenticatedTemplate>
//           </MsalProvider>
//         </Box>
//       </StyledPaper>
//     </StyledContainer>
//   );
// };

// export default Login;


import React, { useEffect } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { MsalProvider, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { msalInstance } from "../authConfig";
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  width: '100%',
  backgroundColor: '#f0f0f0',
});

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <Button
      onClick={handleLogin}
      variant="contained"
      color="primary"
      sx={{ mt: 2, width: '100%' }}
    >
      Login with Azure AD
    </Button>
  );
};

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="secondary"
      sx={{ mt: 2, width: '100%' }}
    >
      Logout with Azure AD
    </Button>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { accounts } = useMsal();

  useEffect(() => {
    // If the user is authenticated, redirect them to the dashboard
    if (accounts.length > 0) {
      navigate('/dashboard');
    }
  }, [accounts, navigate]); // Dependency array ensures useEffect runs only when accounts or navigate changes

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Task Manager
        </Typography>
        <Box component="form" noValidate autoComplete="off">
        <MsalProvider instance={msalInstance}>
          <AuthenticatedTemplate>
          <Typography variant="h6" align="center" gutterBottom>
                Welcome back!
              </Typography>
              <LogoutButton />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <LoginButton />
          </UnauthenticatedTemplate>
        </MsalProvider>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;

