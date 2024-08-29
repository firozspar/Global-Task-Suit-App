import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Snackbar,
  Alert,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  InputBase
} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material';
import LeftNavPanel from '../components/LeftNavPanel';
import { useNavigate } from 'react-router-dom'; 
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#7784EE',
}));

const Createtask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://global-task-suite-api.azurewebsites.net/user');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskData = {
      TaskName: taskName,
      TaskDesc: description,
      DueDate: dueDate,
      AssignedTo: assignedUser,
      CreatedBy: 'Mahendra',
      CreatedDate: currentDate,
      Status: 'To Do',
      TaskID: Math.floor(Math.random() * 1000) + 1,
    };

    
    console.log('Data being sent to API:', taskData);
    try {
      const response = await fetch('http://127.0.0.1:5000/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setOpenSuccess(true);
      } else {
        throw new Error('Failed to create task');
      }
    } catch (error) {
      console.error('Error:', error);
      setOpenError(true);
    }
  };

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <AppBarStyled position="fixed">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Avatar alt="Profile Picture" src="https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=184&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7" />
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <LeftNavPanel onLogout={handleLogout} />
      <>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '110px' }}>
        <Grid container spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
        Create New Task
      </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                label="Assign To"
              >
                {users.map((user) => (
                  <MenuItem key={user.UserID} value={user.UserName}>
                    {user.UserName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ backgroundColor: '#7784EE' }}
            >
              Create Task
            </Button>
          </Grid>
        </Grid>
      </form>
      </>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Task created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Failed to create task. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Createtask;
