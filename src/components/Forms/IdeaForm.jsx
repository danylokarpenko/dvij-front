import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import { Box, Button } from '@mui/material';
import { fetchIdea, createIdea } from '../../store/ideas/ideaActions';

const columns = [{ name: 'description' }];

const renderColumn = (c) => (
  <Field
    component={TextField}
    name={c.name}
    type={c.type || c.name}
    label={c.name}
  />
);

export default function IdeaForm({ idea, callback }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (idea.id) dispatch(fetchIdea(idea.id));
  }, [dispatch]);

  if (!idea) {
    return null;
  }

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      ...form,
    };

    dispatch(createIdea(payload));
    callback();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Formik
        initialValues={{
          ...idea,
          description: '',
          likes: [],
          isApproved: false,
        }}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {columns.map(renderColumn)}

            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={isSubmitting}
              onClick={callback}
            >
              Exit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

IdeaForm.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    gameId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  callback: PropTypes.func,
};
