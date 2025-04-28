import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import PostForm from '../components/Post/PostForm';
import Navbar from '../components/Navbar';
import { Typography } from '@mui/material'; // Add this import

const EditPost = () => {
  const { posts, updatePost } = usePost();
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p._id === id);

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  const handleSubmit = async (formData) => {
    try {
      await updatePost(id, formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <>
      <Navbar />
      <PostForm initialValues={post} onSubmit={handleSubmit} isEdit />
    </>
  );
};

export default EditPost;