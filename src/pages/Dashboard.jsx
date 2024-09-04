import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, Menu, MenuItem, Switch
} from '@mui/material';
import {
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LeftNavPanel from '../components/LeftNavPanel';
import Header from '../components/Header';
import DecorativeDots from '../components/DecorativeDots';
import CloseIcon from '@mui/icons-material/Close';
import TaskEditDialog from '../components/TaskEditDialog';
import { useSelector } from 'react-redux';

const getStatusColor = (status) => {
  switch (status) {
    case 'todo':
      return 'lightslategray';
    case 'inProgress':
      return 'darkgoldenrod';
    case 'done':
      return 'forestgreen';
    default:
      return 'black';
  }
};

const MainContainer = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const ToolbarStyled = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const TaskCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
}));

const Dashboard = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createdByToggle, setCreatedByToggle] = useState(false); // Toggle state for fetching tasks by CreatedBy
  const navigate = useNavigate();

  // Access profileName from Redux store
  const profileName = useSelector((state) => state.profile.name);
  console.log("Dashboard profileName from Header", profileName);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const apiUrl = createdByToggle 
          ? `https://global-task-suite-api.azurewebsites.net/tasks/createdBy/${profileName}`
          : `https://global-task-suite-api.azurewebsites.net/tasks/assignedTo/${profileName}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data ============", data);

        const groupedTasks = {
          todo: data.filter(task => task.Status === 'To Do'),
          inProgress: data.filter(task => task.Status === 'InProgress'),
          done: data.filter(task => task.Status === 'Completed')
        };
        setTasks(groupedTasks);

      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [profileName, createdByToggle]); // Refetch tasks when profileName or toggle state changes

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/');
  };

  const handleToggleChange = (event) => {
    setCreatedByToggle(event.target.checked);
  };

  const filteredTasks = {
    todo: tasks.todo.filter(task => 
      task.TaskName.toLowerCase().includes(searchQuery) || 
      task.TaskDesc.toLowerCase().includes(searchQuery) ||
      task.AssignedTo?.toLowerCase().includes(searchQuery) ||
      task.CreatedBy.toLowerCase().includes(searchQuery)
    ),
    inProgress: tasks.inProgress.filter(task => 
      task.TaskName.toLowerCase().includes(searchQuery) || 
      task.TaskDesc.toLowerCase().includes(searchQuery) ||
      task.AssignedTo?.toLowerCase().includes(searchQuery) ||
      task.CreatedBy.toLowerCase().includes(searchQuery)
    ),
    done: tasks.done.filter(task => 
      task.TaskName.toLowerCase().includes(searchQuery) || 
      task.TaskDesc.toLowerCase().includes(searchQuery) ||
      task.AssignedTo?.toLowerCase().includes(searchQuery) ||
      task.CreatedBy.toLowerCase().includes(searchQuery)
    )
  };

  // Handle opening the edit dialog
  const handleUpdateTask = () => {
    setEditDialogOpen(true); // Open the edit dialog
  };

  // Handle closing the dialogs
  const handleCloseDialog = () => {
    setSelectedTask(null);
    setEditDialogOpen(false);
  };

  // Handle saving the updated task
  const handleSaveTask = (updatedTask) => {
    // Update the task in your state or send it to your backend
    console.log('Updated Task:', updatedTask);
    setSelectedTask(updatedTask); // Update the selected task with edited data
  };

  return (
    <MainContainer>
      <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <LeftNavPanel onLogout={handleLogout} />

      <Content>
        <ToolbarStyled />
        <Container>
          <Typography variant="h4" gutterBottom>
            Task List
          </Typography>
          
          {/* Toggle switch for selecting tasks created by the user */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="subtitle1">Show My Created Tasks</Typography>
            <Switch
              checked={createdByToggle}
              onChange={handleToggleChange}
              color="primary"
            />
          </div>

          <Grid container spacing={3}>
            {['todo', 'inProgress', 'done'].map((status, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography variant="h6" gutterBottom color={getStatusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
                {filteredTasks[status].map((task, index) => (
                  <TaskCard key={index} onClick={() => handleCardClick(task)}>
                    <CardContent>
                      <Typography variant="caption" color="lightcoral">
                        Created By: {task.CreatedBy}
                      </Typography>
                      <Typography variant="h6">{task.TaskName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {task.TaskDesc}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Due Date: {task.DueDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Assigned To: {task.AssignedTo || 'Unassigned'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Created Date: {task.CreatedDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {task.Status}
                      </Typography>
                      <DecorativeDots />
                    </CardContent>
                  </TaskCard>
                ))}
              </Grid>
            ))}
          </Grid>
        </Container>
      </Content>

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={Boolean(selectedTask)} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography sx={{ color: 'darkorange' }}>{selectedTask.TaskName}</Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
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
            <Typography variant="body1"><strong>Description:</strong> {selectedTask.TaskDesc}</Typography>
            <Typography variant="body1"><strong>Assigned To:</strong> {selectedTask.AssignedTo || 'Unassigned'}</Typography>
            <Typography variant="body1"><strong>Due Date:</strong> {selectedTask.DueDate}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {selectedTask.Status}</Typography>
            <Typography variant="body1"><strong>Created By:</strong> {selectedTask.CreatedBy}</Typography>
            <Typography variant="body1"><strong>Created Date:</strong> {selectedTask.CreatedDate}</Typography>
            <MenuItem variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#7784EE' }} onClick={handleUpdateTask}>Edit Task</MenuItem>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Task Edit Dialog */}
      {selectedTask && (
        <TaskEditDialog
          open={editDialogOpen}
          onClose={handleCloseDialog}
          task={selectedTask}
          onSave={handleSaveTask}
        />
      )}
    </MainContainer>
  );
};

export default Dashboard;
