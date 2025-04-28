import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePost } from '../../context/PostContext';
import { useAuth } from '../../context/AuthContext';

const PostDetail = () => {
  const { posts, deletePost } = usePost();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 5 }}>
      {post.image && (
        <Box mb={3}>
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        By: {post.author?.username} | {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      {user && user._id === post.author?._id && (
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/edit-post/${post._id}`}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetail;