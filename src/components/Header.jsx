import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { Client } from '@microsoft/microsoft-graph-client';
import { AppBar, Toolbar, IconButton, InputBase, Avatar, Typography, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
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
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" style={{ marginRight: '16px' }}>
                        {profileName}
                    </Typography>
                    <IconButton color="inherit">
                        <Avatar
                            alt="Profile Picture"
                            src={'data:image/jpeg;base64,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'}
                        />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBarStyled>
    );
};

export default Header;
