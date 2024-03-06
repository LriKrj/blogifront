import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Button component={NavLink} to="/" color="inherit" sx={{ marginRight: 2 }}>
              Blogs
            </Button>
            <Button component={NavLink} to="/users" color="inherit" sx={{ marginRight: 2 }}>
              Users
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {user.name && (
              <>
                <Box sx={{ marginRight: 2 }}>{user.name} logged in</Box>
                <Button onClick={handleLogout} color="inherit">
                  Log out
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navigation;
