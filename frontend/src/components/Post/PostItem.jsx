import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PostItem = ({ post }) => {
  const { user } = useAuth();

  return (
    <Card sx={{ 
      width: '100%',
      mb: 4,
      boxShadow: 3,
      borderRadius: 2,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6
      }
    }}>
      {/* Hero Image Section */}
      {post.image && (
        <Box sx={{
          width: '100%',
          height: { xs: '250px', sm: '350px', md: '450px' },
          overflow: 'hidden',
          position: 'relative',
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.03)'
            }
          }
        }}>
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
          />
        </Box>
      )}
      
      {/* Content Section */}
      <CardContent sx={{ p: 4 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}
        >
          {post.title}
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            mb: 3, 
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          {post.content.substring(0, 200)}...
        </Typography>
        
        <Typography 
          variant="subtitle2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            fontStyle: 'italic'
          }}
        >
          By: {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      
      {/* Action Buttons */}
      <CardActions sx={{ px: 4, pb: 3 }}>
        <Button 
          size="large" 
          component={Link} 
          to={`/post/${post._id}`}
          variant="contained"
          sx={{ 
            mr: 2,
            px: 3,
            py: 1
          }}
        >
          Read Full Article
        </Button>
        {user && user._id === post.author?._id && (
          <Button 
            size="large" 
            component={Link} 
            to={`/edit-post/${post._id}`}
            variant="outlined"
            color="secondary"
            sx={{
              px: 3,
              py: 1
            }}
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PostItem;