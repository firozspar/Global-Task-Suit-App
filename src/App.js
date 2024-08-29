import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Createtask from './pages/CreateTask';

const theme = createTheme({
  // will customize the theme here later
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createtask" element={<Createtask />} />
      </Routes>
    </Router>
  </ThemeProvider>
    
  );
};

export default App;

