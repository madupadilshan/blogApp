import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/posts');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Server Error');
      setLoading(false);
    }
  };

  const createPost = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const res = await api.post('/posts', formData, config);
      setPosts([res.data, ...posts]);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || 'Server Error';
    }
  };

  const updatePost = async (id, formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const res = await api.put(`/posts/${id}`, formData, config);
      setPosts(posts.map(post => post._id === id ? res.data : post));
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || 'Server Error';
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      throw err.response?.data?.error || 'Server Error';
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        getPosts,
        createPost,
        updatePost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);