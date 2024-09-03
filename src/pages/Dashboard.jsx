import React, { useState, useEffect } from 'react';
import {
  Button, Container, Grid, Card, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, MenuItem, FormControl, Select, InputLabel, MenuItem as SelectMenuItem
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
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
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [filterCreatedByMe, setFilterCreatedByMe] = useState(false);

  // Accessing profileName from Redux store
  const profileName = useSelector((state) => state.profile.name);
  console.log("Dashboard profileName from Header", profileName);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://global-task-suite-api.azurewebsites.net/tasks');
      const data = await response.json();
      console.log("data ============", data);

      const groupedTasks = {
        todo: data.filter(task => task.Status === 'To Do' && task.AssignedTo?.toLowerCase() === profileName.toLowerCase()),
        inProgress: data.filter(task => task.Status === 'InProgress' && task.AssignedTo?.toLowerCase() === profileName.toLowerCase()),
        done: data.filter(task => task.Status === 'Completed' && task.AssignedTo?.toLowerCase() === profileName.toLowerCase())
      };
      setTasks(groupedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://global-task-suite-api.azurewebsites.net/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [profileName]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
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

  const handleFilterCreatedByMe = () => {
    setFilterCreatedByMe(!filterCreatedByMe);
    fetchTasks();
  };

  const filteredTasks = {
    todo: tasks.todo.filter(task =>
      (selectedUser === '' || task.AssignedTo?.toLowerCase() === selectedUser.toLowerCase()) &&
      (filterCreatedByMe ? task.CreatedBy.toLowerCase() === profileName.toLowerCase() : true) &&
      (task.TaskName.toLowerCase().includes(searchQuery) ||
        task.TaskDesc.toLowerCase().includes(searchQuery) ||
        task.AssignedTo?.toLowerCase().includes(searchQuery) ||
        task.CreatedBy.toLowerCase().includes(searchQuery))
    ),
    inProgress: tasks.inProgress.filter(task =>
      (selectedUser === '' || task.AssignedTo?.toLowerCase() === selectedUser.toLowerCase()) &&
      (filterCreatedByMe ? task.CreatedBy.toLowerCase() === profileName.toLowerCase() : true) &&
      (task.TaskName.toLowerCase().includes(searchQuery) ||
        task.TaskDesc.toLowerCase().includes(searchQuery) ||
        task.AssignedTo?.toLowerCase().includes(searchQuery) ||
        task.CreatedBy.toLowerCase().includes(searchQuery))
    ),
    done: tasks.done.filter(task =>
      (selectedUser === '' || task.AssignedTo?.toLowerCase() === selectedUser.toLowerCase()) &&
      (filterCreatedByMe ? task.CreatedBy.toLowerCase() === profileName.toLowerCase() : true) &&
      (task.TaskName.toLowerCase().includes(searchQuery) ||
        task.TaskDesc.toLowerCase().includes(searchQuery) ||
        task.AssignedTo?.toLowerCase().includes(searchQuery) ||
        task.CreatedBy.toLowerCase().includes(searchQuery))
    )
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/');
  };

  const handleUpdateTask = () => {
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
    setEditDialogOpen(false);
  };

  const handleSaveTask = (updatedTask) => {
    console.log('Updated Task:', updatedTask);
    setSelectedTask(updatedTask);
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

          <Button
            variant={filterCreatedByMe ? 'contained' : 'outlined'}
            color="primary"
            onClick={handleFilterCreatedByMe}
            style={{ margin: '20px 0' }}
          >
            {filterCreatedByMe ? 'Show All Tasks' : 'Show My Created Tasks'}
          </Button>

          <Grid container spacing={3}>
            {['todo', 'inProgress', 'done'].map((status, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography variant="h6" gutterBottom color={getStatusColor(status)}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Typography>
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
              <Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#7784EE' }} onClick={handleUpdateTask}> Edit Task </Button>
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
      </Content>
    </MainContainer>
  );
};

export default Dashboard;
