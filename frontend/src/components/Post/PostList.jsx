import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import PostItem from './PostItem';
import { usePost } from '../../context/PostContext';

const PostList = () => {
  const { posts, loading, error } = usePost();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Box key={post._id} sx={{ mb: 4 }}>
          <PostItem post={post} />
        </Box>
      ))}
    </>
  );
};

export default PostList;