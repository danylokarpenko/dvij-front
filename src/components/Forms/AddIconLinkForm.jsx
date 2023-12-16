import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { updateGame } from '../../store/game/gameActions';
import { FormField } from '../FormikFields/FormField';

const formColumns = (linkColumnName) => [
  {
    name: linkColumnName,
    type: 'text',
    label: linkColumnName ? `Link to ${linkColumnName}` : 'Link',
    style: { minWidth: 200 },
  },
];

const renderFormField = ({ ...fieldProps }, i) => (
  <FormField key={fieldProps.name || i} {...fieldProps} />
);

export default function AddIconLinkForm({ linkColumnName, game, callback }) {
  const dispatch = useDispatch();

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      id: game.id,
      ...form,
    };

    dispatch(updateGame({ payload, linkColumnName }));
    callback();
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Formik
        initialValues={{
          id: game.id,
          [linkColumnName]: game[linkColumnName],
        }}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {formColumns(linkColumnName).map(renderFormField)}
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
              style={{ marginRight: 10 }}
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

AddIconLinkForm.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  callback: PropTypes.func,
  linkColumnName: PropTypes.string.isRequired,
};
