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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../img/logo.svg";

const pages = ['Search', 'Contact'];
const settings = ['Profile', 'Saves', 'Logout'];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);  

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={logo} alt="Logo" width="30" height="30" /> {/* This is the logo in the AppBar */}
        <Typography
            variant="h6"
            noWrap
            component={Link} // Use the Link component
            to="/" // Set the link destination to the root
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                marginLeft: '20px',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            Peoplemvr {/* This is the large logo */}
            </Typography>

          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'flex', md: 'none' }, }}>
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
            {/* This is the slide-out left menu */}
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
            component={Link} // Use the Link component
            to="/" // Set the link destination to the root
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            Peoplemvr {/* This is the small logo */}
            </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* This is our large screen menu */}
            {pages.map((page) => (
                <MenuItem 
                    component={Link} // Use the Link component
                    to={page === "Search" ? "/" : `/${page.toLowerCase()}`} // Set the link destination based on the page name
                    key={page}
                    onClick={handleCloseDrawer}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
            {/* This is wheer we are mapping settings */}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;