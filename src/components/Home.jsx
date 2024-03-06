import React, { useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Blogs from './Blogs';

const Home = () => {
  const blogFormRef = useRef();

  return (
    <Box p={2}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </Paper>
      <Blogs />
    </Box>
  );
};

export default Home;
