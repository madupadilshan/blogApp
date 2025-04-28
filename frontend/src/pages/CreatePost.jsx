import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import PostForm from '../components/Post/PostForm';
import Navbar from '../components/Navbar';

const CreatePost = () => {
  const { createPost } = usePost();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createPost(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <>
      <Navbar />
      <PostForm onSubmit={handleSubmit} />
    </>
  );
};

export default CreatePost;