import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, MenuItem, TextField, Button, FormControl,
  InputLabel, Select, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TaskEditDialog = ({ task, open, onClose, onSave }) => {
  const [editTask, setEditTask] = useState(task);
  const [assignedUser, setAssignedUser] = useState(task?.AssignedTo || '');
  const [users, setUsers] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    setEditTask(task);
    setAssignedUser(task?.AssignedTo || '');
  }, [task]);

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

  const handleEditChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const taskId = editTask?.TaskID || editTask?.taskId;
  const handleSave = async (event) => {
    event.preventDefault();
    const taskData = {
      TaskName: editTask?.TaskName,
      TaskDesc: editTask?.TaskDesc,
      DueDate: editTask?.DueDate,
      AssignedTo: assignedUser,
      Status: editTask?.Status,
      TaskId: taskId,
    };

    if (!taskId) {
      console.error('Task ID is undefined, unable to update task');
      return;
    }

    console.log('Data being sent to API:', taskData);
    try {
      const response = await fetch(`https://global-task-suite-api.azurewebsites.net/updateTask/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setOpenSuccess(true);
        setTimeout(() => {
          setOpenSuccess(false);
          onClose();
          //window.location.reload();
        }, 1500);
      } else {
        throw new Error('Failed to update task');
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant='h5' sx={{ color: 'darkorange' }}>Edit Task</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          name="TaskName"
          value={editTask?.TaskName || ''}
          onChange={handleEditChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="TaskDesc"
          value={editTask?.TaskDesc || ''}
          onChange={handleEditChange}
          fullWidth
          margin="dense"
          multiline
          rows={4}
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
        <TextField
          label="Due Date"
          name="DueDate"
          type="date"
          value={editTask?.DueDate || ''}
          onChange={handleEditChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="Status"
            value={editTask?.Status || ''}
            onChange={handleEditChange}
            label="Status"
          >
            <MenuItem value={'To Do'}>To Do</MenuItem>
            <MenuItem value={'InProgress'}>InProgress</MenuItem>
            <MenuItem value={'Completed'}>Completed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary" variant="contained" sx={{ backgroundColor: '#7784EE' }}>
          Save
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Task updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Failed to update task.
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default TaskEditDialog;
