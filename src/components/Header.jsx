import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';
import { AppBar, Toolbar, IconButton, InputBase, Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setProfileName, setProfileImage } from '../features/profile/profileSlice';
import { msalInstance, initializeMsal } from '../authConfig';

const getAuthenticatedClient = (accessToken) => {
    return Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });
};

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#7784EE',
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

const Header = ({ searchQuery, handleSearchChange }) => {
    const { instance, accounts } = useMsal();
    const dispatch = useDispatch();
    const profileName = useSelector((state) => state.profile.name);
    const profileImage = useSelector((state) => state.profile.image);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                await initializeMsal();
                if (accounts.length > 0) {
                    const account = msalInstance.getAllAccounts()[0];
                    const accessToken = await instance.acquireTokenSilent({
                        scopes: ['User.Read'],
                        account: account,
                    });

                    const client = getAuthenticatedClient(accessToken.accessToken);

                    // Fetching user profile data from Azure Account
                    const userResponse = await client.api('/me').get();
                    console.log("Fetch user profile data:", userResponse);
                    dispatch(setProfileName(userResponse.userPrincipalName));

                    // Fetching user profile photo from Azure Account
                    try {
                        const photoResponse = await client.api('/me/photo/$value').get();
                        const imageBlob = new Blob([photoResponse], { type: 'image/jpeg' });
                        dispatch(setProfileImage(URL.createObjectURL(imageBlob)));
                    } catch (photoError) {
                        dispatch(setProfileImage('/path/to/default/profile/image.jpg'));
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [instance, accounts, dispatch]);

    return (
        <AppBarStyled position="fixed">
            <Toolbar>
                <Search>
                    <SearchIconWrapper>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Search>
                <div style={{ flexGrow: 1 }} />
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{ marginRight: '16px' }}>
                        {profileName}
                    </Typography>
                    <IconButton color="inherit">
                    <a href="https://myaccount.microsoft.com/?ref=MeControl" target="_blank" rel="noopener noreferrer">
                        <Avatar
                            alt="Profile Picture"
                            src={'https://icons.veryicon.com/png/o/system/crm-android-app-icon/app-icon-person.png'}
                        />
                        </a>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBarStyled>
    );
};

export default Header;
