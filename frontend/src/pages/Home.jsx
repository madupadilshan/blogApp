import React from 'react';
import PostList from '../components/Post/PostList';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3
            }}
          >
            Welcome to My Blog
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Discover the latest articles and stories
          </Typography>
        </Box>
        
        {/* Changed to single column layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PostList />
        </Box>
      </Container>
    </>
  );
};

export default Home;