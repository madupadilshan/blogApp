import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PostForm = ({ initialValues, onSubmit, isEdit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required')
  });

  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      content: '',
      image: null
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      if (values.image) {
        formData.append('image', values.image);
      }
      onSubmit(formData);
    }
  });

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Post' : 'Create Post'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />
        <TextField
          fullWidth
          id="content"
          name="content"
          label="Content"
          multiline
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          margin="normal"
        />
        <Box mt={2}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={(event) => {
              formik.setFieldValue('image', event.currentTarget.files[0]);
            }}
          />
          {initialValues?.image && (
            <Box mt={2}>
              <Typography variant="body2">Current Image:</Typography>
              <img
                src={`http://localhost:5000/uploads/${initialValues.image}`}
                alt="Current"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </Box>
          )}
        </Box>
        <Box mt={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            {isEdit ? 'Update Post' : 'Create Post'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default PostForm;