import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import LeftNavPanel from '../components/LeftNavPanel';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [users, setUsers] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split('T')[0];

  // Accessing profileName from Redux store
  const profileName = useSelector((state) => state.profile.name);
  console.log("CreateTask profileName from Header", profileName);

  useEffect(() => {
    // Fetching users from API
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
      CreatedBy: profileName,
      CreatedDate: currentDate,
      Status: 'To Do',
      TaskID: Math.floor(Math.random() * 1000) + 1,
    };

    console.log('Data being sent to API:', taskData);
    try {
      const response = await fetch('https://global-task-suite-api.azurewebsites.net/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setOpenSuccess(true);
        setTimeout(()=>{
          setOpenSuccess(false);
          navigate('/dashboard');
          window.location.reload();
        }, 1500);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="fixed">
        <Toolbar>
          <Header
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />
        </Toolbar>
      </AppBar>

      <LeftNavPanel onLogout={handleLogout} />
      <form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom>
          Create Task
        </Typography>
        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
          margin="normal"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          inputProps={{ min: currentDate }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Assigned User</InputLabel>
          <Select
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            label="Assigned User"
          >
            {users.map((user) => (
              <MenuItem key={user.UserID} value={user.UserName}>
                {user.UserName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </form>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Task created successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Failed to create task.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateTask;
