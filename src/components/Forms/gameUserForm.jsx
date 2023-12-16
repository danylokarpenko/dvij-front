import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createGame, fetchGame } from '../../store/gameUser/gameUserActions';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import Select from 'react-select';

const columns = [{ name: 'userId', component: Select }];

const renderColumn = (c) => (
  <Field
    component={c.component || TextField}
    name={c.name}
    type={c.type || c.name}
    label={c.name}
  />
);

export default function GameForm({ gameUser, callback }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (gameUser.id) dispatch(fetchGame(gameUser.id));
  }, [dispatch]);

  if (!gameUser) {
    return null;
  }

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      ...form,
    };

    dispatch(createGame(payload));
    callback();
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Formik
        initialValues={{
          ...gameUser,
          userId: null,
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
          </Form>
        )}
      </Formik>
    </Box>
  );
}

GameForm.propTypes = {
  gameUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    gameUserId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  callback: PropTypes.func,
};
