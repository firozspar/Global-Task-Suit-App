import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, IconButton, InputBase,
  AppBar, Toolbar, Avatar
} from '@mui/material';
import {
  Search as SearchIcon, MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LeftNavPanel from '../components/LeftNavPanel'; // Import the LeftNavPanel component

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/tasks');
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
            />
          </Search>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Avatar alt="Profile Picture" src="https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=184&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7" />
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <LeftNavPanel onLogout={handleLogout} /> {/* Use the LeftNavPanel component */}

      <Content>
        <ToolbarStyled />
        <Container>
          <Typography variant="h4" gutterBottom>
            Task List
          </Typography>
          <Grid container spacing={3}>
            {/* To Do Tasks */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom color="lightslategray">To Do</Typography>
              {tasks.todo.map((task, index) => (
                <TaskCard key={index}>
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
                        <IconButton><MoreVertIcon /></IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </TaskCard>
              ))}
            </Grid>

            {/* In Progress Tasks */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom color="darkgoldenrod">In Progress</Typography>
              {tasks.inProgress.map((task, index) => (
                <TaskCard key={index}>
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
                        <IconButton><MoreVertIcon /></IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </TaskCard>
              ))}
            </Grid>

            {/* Done Tasks */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom color="forestgreen">Completed</Typography>
              {tasks.done.map((task, index) => (
                <TaskCard key={index}>
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
                        <IconButton><MoreVertIcon /></IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </TaskCard>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Content>
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




