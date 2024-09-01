import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, IconButton, InputBase,
  AppBar, Toolbar, Avatar, Dialog, DialogTitle, DialogContent, Menu, MenuItem
} from '@mui/material';
import {
  Search as SearchIcon, MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LeftNavPanel from '../components/LeftNavPanel';

const MainContainer = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#7784EE',
}));

const ToolbarStyled = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://global-task-suite-api.azurewebsites.net/tasks');
        const data = await response.json();

        const groupedTasks = {
          todo: data.filter(task => task.Status === 'To Do'),
          inProgress: data.filter(task => task.Status === 'Pending'),
          done: data.filter(task => task.Status === 'Completed')
        };
        setTasks(groupedTasks);

      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleLogout = () => {
    console.log('Logout');
    navigate('/');
  };

  return (
    <MainContainer>
      <AppBarStyled position="fixed">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Search>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Avatar alt="Profile Picture" src="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg.webp" />
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <LeftNavPanel onLogout={handleLogout} />

      <Content>
        <ToolbarStyled />
        <Container>
          <Typography variant="h4" gutterBottom>
            Task List
          </Typography>
          <Grid container spacing={3}>
            {['todo', 'inProgress', 'done'].map((status, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Typography variant="h6" gutterBottom color="darkgoldenrod">{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
                {filteredTasks[status].map((task, index) => (
                  <TaskCard key={index} onClick={() => handleCardClick(task)}>
                    <CardContent>
                      <Typography variant="caption" color="textSecondary">
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
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <AvatarGroup />
                        </Grid>
                        <Grid item>
                          <IconButton onClick={handleMenuClick}><MoreVertIcon /></IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                          </Menu>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </TaskCard>
                ))}
              </Grid>
            ))}
          </Grid>
        </Container>
      </Content>

      {/* Dialog for displaying the full task details */}
      {selectedTask && (
        <Dialog open={Boolean(selectedTask)} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{selectedTask.TaskName}</DialogTitle>
          <DialogContent>
            <Typography variant="body1"><strong>Description:</strong> {selectedTask.TaskDesc}</Typography>
            <Typography variant="body1"><strong>Assigned To:</strong> {selectedTask.AssignedTo || 'Unassigned'}</Typography>
            <Typography variant="body1"><strong>Due Date:</strong> {selectedTask.DueDate}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {selectedTask.Status}</Typography>
            <Typography variant="body1"><strong>Created By:</strong> {selectedTask.CreatedBy}</Typography>
            <Typography variant="body1"><strong>Created Date:</strong> {selectedTask.CreatedDate}</Typography>
          </DialogContent>
        </Dialog>
      )}
    </MainContainer>
  );
};

const AvatarGroup = () => (
  <div style={{ display: 'flex' }}>
    <Avatar sx={{ width: 24, height: 24, background:'#00569E'}}>VH</Avatar>
    <Avatar sx={{ width: 24, height: 24 , background:'#FEA946'}}>AG</Avatar>
  </div>
);
export default Dashboard;
