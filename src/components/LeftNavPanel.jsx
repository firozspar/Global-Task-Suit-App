import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard as DashboardIcon, Add as AddIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LogoStyled = styled('img')(({ theme }) => ({
  height: '130px', // Adjust height as needed
  margin: theme.spacing(6),
  marginTop: '60px'
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
      <ToolbarStyled>
        <LogoStyled
          src="https://appexchange.salesforce.com/partners/servlet/servlet.FileDownload?file=00P4V000012vyuhUAA"
          alt="Logo"
        />
      </ToolbarStyled>
      <div style={{marginTop:'-38px'}}>
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
      <List style={{marginTop:'250px'}}>
        <ListItemStyled button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemStyled>
      </List>
      </div>
    </DrawerStyled>
  );
};

export default LeftNavPanel;
