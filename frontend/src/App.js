import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './components/Post/PostDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        {/* Remove any Router component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;