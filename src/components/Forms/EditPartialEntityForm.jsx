import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormField } from '../FormikFields/FormField';

const formColumns = (entityColumnNameToEdit) => [
  {
    name: entityColumnNameToEdit,
    type: 'text',
    label: entityColumnNameToEdit
      ? `Column ${entityColumnNameToEdit}`
      : 'Column',
    style: { minWidth: 200 },
  },
];

const renderFormField = ({ ...fieldProps }, i) => (
  <FormField key={fieldProps.name || i} {...fieldProps} />
);

export default function EditPartialEntityForm({
  entityColumnNameToEdit,
  entity,
  callback,
  updateEntityAction,
  deleteEntityAction,
}) {
  const dispatch = useDispatch();

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      id: entity.id,
      ...form,
    };

    dispatch(updateEntityAction({ payload, entityColumnNameToEdit }));
    callback();
  };

  const handleDelete = (form) => {
    event.preventDefault();

    const payload = {
      id: entity.id,
      ...form,
    };

    dispatch(deleteEntityAction(payload.id));
    callback();
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Formik
        initialValues={{
          id: entity.id,
          [entityColumnNameToEdit]: entity[entityColumnNameToEdit],
        }}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            {formColumns(entityColumnNameToEdit).map(renderFormField)}
            <br />
            <Button
              variant="text"
              color="success"
              disabled={isSubmitting}
              onClick={submitForm}
              style={{ marginRight: 10 }}
            >
              Submit
            </Button>
            <Button
              variant="text"
              color="warning"
              disabled={isSubmitting}
              onClick={callback}
              style={{ marginRight: 10 }}
            >
              Exit
            </Button>
            <Button
              variant="text"
              color="error"
              disabled={isSubmitting}
              onClick={handleDelete}
            >
              <DeleteForeverIcon />
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

EditPartialEntityForm.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  deleteEntityAction: PropTypes.func,
  updateEntityAction: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  entityColumnNameToEdit: PropTypes.string.isRequired,
};
