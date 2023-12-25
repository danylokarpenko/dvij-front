import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  createIteration,
  fetchIteration,
} from '../../store/iteration/iterationActions';

const columns = [{ name: 'description' }];

const renderColumn = (c) => (
  <Field
    component={TextField}
    name={c.name}
    type={c.type || c.name}
    label={c.name}
  />
);

export default function IterationForm({ item, callback }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (item?.id) dispatch(fetchIteration(item.id));
  }, [dispatch]);

  if (!item) {
    return null;
  }

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      ...form,
    };

    dispatch(createIteration(payload));
    callback();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Formik
        initialValues={{
          ...item,
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

IterationForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    gameId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  callback: PropTypes.func,
};
