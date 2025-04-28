import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material'; // Add this import

const NotFound = () => {
  return (
    <>
      <Navbar />
      <Box p={3} textAlign="center">
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Go Home
        </Button>
      </Box>
    </>
  );
};

export default NotFound;