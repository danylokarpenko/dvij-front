import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'formik-material-ui';

import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { createGameUser } from '../../store/game/gameActions';
import { FormField } from '../FormikFields/FormField';
import UsersAutocomplete from '../FormikFields/Autocomplete/UsersAutocomplete';

const columns = [
  {
    name: 'userId',
    component: UsersAutocomplete,
    label: 'User',
    style: { minWidth: 200 },
  },
  { name: 'isLead', component: Checkbox, label: 'IsLead?' },
];

const renderFormField = ({ ...fieldProps }, i) => (
  <FormField key={fieldProps.name || i} {...fieldProps} />
);

export default function AddGameUserForm({ game, callback }) {
  const dispatch = useDispatch();

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      ...form,
      gameId: game.id,
    };

    dispatch(createGameUser(payload));
    callback();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Formik
        initialValues={{
          gameId: game.id,
          isLead: false,
          userId: null,
        }}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {columns.map(renderFormField)}
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

AddGameUserForm.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  callback: PropTypes.func,
};
