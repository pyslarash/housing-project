import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Drawer } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../img/logo-100.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, setToken, setUsername, setPassword, setId } from '../store/userSlice';
import axios from "axios";
import avatar_pic from "../../img/avatars/locationpropic.png"
//import { setLoggedIn, setToken, setEmail, setPassword, setUsername } from "../../store/userSlice";


const API_URL = process.env.REACT_APP_BD_URL;

const pages = ['Search', 'Contact'];
const settings = ['Profile', 'Logout'];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const token = useSelector(state => state.user.token);
  const username = useSelector(state => state.user.username);
  const password = useSelector(state => state.user.password);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const id = useSelector(state => state.user.id);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    // Handle the login logic here, such as showing a login form
    console.log('Login clicked');
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, null, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        "data": {
          "username": username,
          "password": password
        }
      }, console.log(token));

      // clear the user's access token from the state
      dispatch(setToken(null));
      dispatch(setLoggedIn(false));
      handleCloseUserMenu();
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  // Setting Profile image:

  const [data, setData] = useState({});

  // Calling the image

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // Setting a temporary variable for the profile img

  let setProfileImage = null;

  // If the image exists, we are setting it:

  if (data.profile_pic) {
    console.log("data: ", data)
    console.log("data.profile_pic: ", data.profile_pic);
    const imageFolder = "./avatars/";
    const imageFile = data.profile_pic;
    const imagePath = imageFolder + imageFile;
    setProfileImage = require(`${imagePath}`);
  }

  return (
    <AppBar className="header" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="Logo" width="50" height="50" />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              marginLeft: '20px',
              color: 'inherit',
              textDecoration: 'none',
              fontFamily: 'k2D, sans-serif',
              fontSize: '24px',
            }}
          >
            LocationPro
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleCloseDrawer}
              sx={{
                display: { xs: 'block', md: 'none' },
                minWidth: '100vw',
                width: '33%',
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={Link}
                  to={page === 'Search' ? '/' : `/${page.toLowerCase()}`}
                  key={page}
                  onClick={handleCloseDrawer}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Drawer>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontFamily: 'k2D, sans-serif',
              fontSize: '24px',
            }}
          >
            LocationPro
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                component={Link}
                to={page === 'Search' ? '/' : `/${page.toLowerCase()}`}
                key={page}
                onClick={handleCloseDrawer}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* Conditionally render the user avatar or the Login button based on whether the user is logged in */}
            {loggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={setProfileImage ? setProfileImage : avatar_pic} />
                </IconButton>
              </Tooltip>
            ) : (
              <MenuItem
                component={Link}
                to={'/login'}
              >
                Login
              </MenuItem>
            )}
            {loggedIn && (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === 'Logout' ? handleLogout :
                        setting === 'Profile' ? () => {
                          handleCloseUserMenu();
                          navigate('/profile');
                        } :
                          null
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );

};

export default Navbar;
