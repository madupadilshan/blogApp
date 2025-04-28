import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ isLogin, onSubmit }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    ...(!isLogin && {
      username: Yup.string().required('Required')
    })
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      ...(!isLogin && { username: '' })
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {isLogin ? 'Login' : 'Register'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {!isLogin && (
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
          />
        )}
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Box mt={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AuthForm;