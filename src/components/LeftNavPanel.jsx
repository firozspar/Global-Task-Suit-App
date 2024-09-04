import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard as DashboardIcon, Add as AddIcon, ExitToApp as LogoutIcon, AccountCircle as AzurePortalIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)(({ theme = {} }) => ({
  width: theme.drawer?.width || drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.drawer?.width || drawerWidth,
    boxSizing: 'border-box',
  },
}));

const ToolbarStyled = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const ListItemStyled = styled(ListItem)(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.action.selected : 'inherit',
  '&:hover': {
    backgroundColor: active ? theme.palette.action.selected : theme.palette.action.hover,
  },
}));

const LeftNavPanel = () => {
  const { instance } = useMsal();
  const location = useLocation();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  const handleAzurePortalRedirect = () => {
    window.open('https://portal.azure.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <DrawerStyled variant="permanent">
      <ToolbarStyled />
      <List>
        <ListItemStyled
          component={Link}
          to="/dashboard"
          active={location.pathname === '/dashboard' ? 1 : 0}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemStyled>
        <ListItemStyled
          component={Link}
          to="/createtask"
          active={location.pathname === '/createtask' ? 1 : 0}
        >
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Create Task" />
        </ListItemStyled>
        {/* <ListItemStyled button onClick={handleAzurePortalRedirect}>
          <ListItemIcon><AzurePortalIcon /></ListItemIcon>
          <ListItemText primary="Azure Portal" />
        </ListItemStyled> */}
      </List>
      <Divider />
      <List>
        <ListItemStyled button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemStyled>
      </List>
    </DrawerStyled>
  );
};

export default LeftNavPanel;
