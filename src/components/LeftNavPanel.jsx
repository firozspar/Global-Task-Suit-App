import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard as DashboardIcon, Add as AddIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
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

const LeftNavPanel = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <DrawerStyled variant="permanent">
      <ToolbarStyled />
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/createtask">
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Create Task" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </DrawerStyled>
  );
};

export default LeftNavPanel;
